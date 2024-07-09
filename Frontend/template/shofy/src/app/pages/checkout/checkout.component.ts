import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '@/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '@/types/product-type';
import { checkk } from '@/types/checkt-type';
import { ICity } from '@/types/cities-type';
import cities_data from '@/data/city-data';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {


  benimUrl = "https://bycobackend.online:5001/api";

  public checkouts: checkk = {};

  public urunler: IProduct[] = [];

  isOpenLogin = false;
  isOpenCoupon = false;
  isUserLogin = false;
  isTermAccepted = false;

  infoUpdated: boolean = false;
  shipCost: number = 0;
  couponCode: string = '';
  payment_name: string = '';
  userid: number = -1;
  discount: number = 0;
  objCities: ICity[] = [];


  myObject = {
    user_id: "",
    adsoyad: 'Süleyman Rıfkı',
    email: 'byco@byco.com.tr',
    vkno: '12345678910',
    tip: '1',
    telefon: '05555555555',
    adres: 'Byco Mahallesi, Byco sokak, Byco Apartmanı, No:23',
    discount: '00'
  };

  constructor(public cartService: CartService, private toastrService: ToastrService) { }

  showPolicyModal: boolean = false;
  showPaymentModal: boolean = false;

  togglePolicyModal(): void {
    this.showPolicyModal = !this.showPolicyModal;
  }

  togglePaymentModal(): void {
    this.showPaymentModal = !this.showPaymentModal;
  }

  handleOpenLogin() {
    this.isOpenLogin = !this.isOpenLogin;
  }
  handleOpenCoupon() {
    this.isOpenCoupon = !this.isOpenCoupon;
  }

  handleShippingCost(value: number | string) {
    let sayi = Number(value)
    this.discount = (this.cartService.totalPriceQuantity().total * sayi) / 100;
    // if (value === 'free') {
    //   this.shipCost = 0;
    // } else {
    //   this.shipCost = value as number;
    // }
  }

  onCheckboxClick(event: any): void {
    console.log('Tıklandı', event.target.checked);
    this.isTermAccepted = event.target.checked;
  }


  public countrySelectOptions = [
    { value: 'select-country', text: 'Select Country' },
    { value: 'avrupa', text: 'Avrupa' },
    { value: 'asya', text: 'Asya' },
    { value: 'afrika', text: 'Afrika' },
    { value: 'amerika', text: 'Amerika' },
  ];

  changeHandler(selectedOption: { value: string; text: string }) {
    console.log('Selected option:', selectedOption);

    // Update the 'country' form control with the selected option's value
    this.checkoutForm.patchValue({
      state: selectedOption.value
    });
  }


  handleCouponSubmit() {
    console.log(this.couponCode);
    // Add coupon code handling logic here
    if (this.couponCode) {
      // logic here

      // when submitted the from than empty will be coupon code
      this.couponCode = ''
    }
  }

  // handle payment item
  handlePayment(value: string) {
    this.payment_name = value
  }

  public checkoutForm!: FormGroup;
  public formSubmitted = false;

  ngOnInit() {
    this.checkoutForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      address: new FormControl(null),
      phone: new FormControl(null),
      email: new FormControl(null),
    })
    this.urunler = this.cartService.getCartProducts();
    this.getIdFromSession();
    this.objCities = cities_data;
  }

  updateInfo() {
    console.log(this.myObject);

    this.infoUpdated = true;
  }

  checkoutDoldur() {
    console.log("checkdoldur");
    this.checkouts.session_key = String(this.getCookie("session_key"));

    this.checkouts.satilan_urunler = [];


    for (let product of this.urunler) {
      let ikili: string[] = []
      ikili?.push(product.id.toString());
      ikili?.push(product.orderQuantity!.toString());
      this.checkouts.satilan_urunler?.push(ikili);
    }

  }

  GetPostChechout(checkout: checkk) {
    this.sendRequest('Satis/MakePurchase', 'POST', checkout)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error("Error: " + err);
      })

  }

  getIdFromSession() {
    console.log("sessionkey ===" + this.getCookie("session_key"))
    this.sendRequest('Sessions/Validate/' + this.getCookie("session_key"), 'GET')
      .then(response => {
        console.log(response);
        this.userid = response;
        this.getUserById();

      })
      .catch(err => {
        console.error("Error: " + err);
      })

  }

  getUserById() {
    this.sendRequest('User/GetResponseById/' + this.userid, 'GET')
      .then(response => {
        console.log(response.data);
        this.myObject = response.data;
        this.isUserLogin = true;
        this.calculateDisc();


      })
      .catch(err => {
        console.error("Error: " + err);
        //this.router.navigate(['/pages/login']);
      })
  }

  calculateDisc() {

    let sayi = Number(this.myObject.discount)
    this.discount = (this.cartService.totalPriceQuantity().total * sayi) / 100;
  }



  getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  sendRequest(url: string, method: string, data?: any): Promise<any> {
    console.log("requesin içi" + JSON.stringify(data));
    return fetch(`${this.benimUrl}/${url}`, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
  }

  odemeYap() {

    try {
      
      let cardholderElement = document.querySelector("#cardholder-name") as HTMLInputElement;
      if (cardholderElement) {
        console.log("cardholder-name : " + cardholderElement.value);
      }
      else {
        console.error("cardholder-name element not found");
      }

      let ccnElement = document.querySelector("#ccn") as HTMLInputElement;
      if (ccnElement) {
        console.log("ccn : " + ccnElement.value);
      }
      else {
        console.error("ccn element not found");
      }

      let expiryElement = document.querySelector("#expiry-date") as HTMLInputElement;
      if (expiryElement) {
        console.log("expiry-date : " + expiryElement.value);
      }
      else {
        console.error("expiry-date element not found");
      }

      let cvcElement = document.querySelector("#cvv") as HTMLInputElement;
      if (cvcElement) {
        console.log("cvv : " + cvcElement.value);
      }
      else {
        console.error("cvv element not found");
      }

      let adresElement = document.querySelector("#address") as HTMLInputElement;
      if (adresElement) {
        console.log("address : " + adresElement.value);
      }
      else {
        console.error("address element not found");
      }

      let objSehirler = document.querySelector("#select") as HTMLSelectElement;
      if (objSehirler) {
        console.log("select : " + objSehirler[objSehirler.selectedIndex].textContent );
      }
      else {
        console.error("select element not found");
      }

      let objIlceler = document.querySelector("#selectstate") as HTMLSelectElement;
      if (objIlceler) {
        console.log("selectstate : " + objIlceler[objIlceler.selectedIndex].textContent);
      }
      else {
        console.error("selectstate element not found");
      }
      
      let zipElement = document.querySelector("#zip") as HTMLInputElement;
      if (zipElement) {
        console.log("zip : " + zipElement.value);
      }
      else {
        console.error("zip element not found");
      }

    } catch (error) {
      console.error("An error occurred in odemeYap:", error);
      // Handle the error or report it to the user here
    }

    /*
    this.checkoutDoldur();
    console.log(this.checkouts)
    this.sendRequest('Satis/MakePurchase', 'POST', this.checkouts)
      .then(response => {
        this.cartService.clear_cartp();
        this.togglePaymentModal();

        console.log(response);
      })
      .catch(err => {
        console.error();
      })
    */
  }

  siparisGonder() {
    this.togglePaymentModal();

    /*
    var x = new Card({
      form: 'form',
      container: '.card',
      formSelectors: {
        numberInput: 'input[name=number]',
        expiryInput: 'input[name=expiry]',
        cvcInput: 'input[name=cvv]',
        nameInput: 'input[name=name]'
      },
    
      width: 390, // optional — default 350px
      formatting: true,
    
      placeholders: {
        number: '•••• •••• •••• ••••',
        name: 'Full Name',
        expiry: '••/••',
        cvc: '•••'
      }
    })
    */
  }

  checkccn() {

    let ccnElement = document.querySelector("#ccn") as HTMLInputElement;
    if (ccnElement) {
      console.error("ccn element found");
      var ccn = ccnElement.value;
      if (ccn.length >= 16) {
        ccnElement.value = ccn.substring(0, 4) + " " + ccn.substring(4, 8) + " " + ccn.substring(8, 12) + " " + ccn.substring(12, 16);
      } else {
        ccnElement.value = "";
      }
    }
    else {
      console.error("ccn element not found");
    }
  }

  checkexpiry() {
    let expiryElement = document.querySelector("#expiry-date") as HTMLInputElement;
    if (expiryElement) {
      console.error("expiry element found");
      var expiry = expiryElement.value;
      if (expiry.length >= 5) {
        expiryElement.value = expiry.substring(0, 2) + "/" + expiry.substring(2, 4);
        if (parseInt(expiryElement.value.substring(0, 2)) > 12 
        || parseInt(expiryElement.value.substring(0, 2)) < 1){
          expiryElement.value = "12" + "/" + expiry.substring(2, 4);
        }
      } else {
        expiryElement.value = "";
      }
    }
    else {
      console.error("expiry element not found");
    }
  }

  checkcvc() {
    let cvcElement = document.querySelector("#cvv") as HTMLInputElement;
    if (cvcElement) {
      console.error("cvc element found");
      var cvc = cvcElement.value;
      if (cvc.length >= 3) {
        cvcElement.value = cvc.substring(0, 3);
      } else {
        cvcElement.value = "";
      }
    }
    else {
      console.error("cvc element not found");
    }
  }

  checkzip() {
    let zipElement = document.querySelector("#zip") as HTMLInputElement;
    if (zipElement) {
      console.error("zip element found");
      var zip = zipElement.value;
      if (zip.length >= 5) {
        zipElement.value = zip.substring(0, 5);
      } else {
        zipElement.value = "";
      }
    }
    else {
      console.error("zip element not found");
    }
  }

  // Define fnIlceler first
  fnIlceler(strSehir_ID: number) {
    try {
      let objIlceler = document.querySelector("#selectstate") as HTMLSelectElement;
      if (!objIlceler) throw new Error("Select element not found");

      while (objIlceler.options.length > 0) {
        objIlceler.remove(0);
      }

      let option = document.createElement("option");
      if (!option) throw new Error("Option element not created");

      for (let i = 0; i < cities_data[strSehir_ID].districts.length; i++) {

        option = document.createElement("option");
        if (!option) throw new Error("Option element not created");

        option.text = cities_data[strSehir_ID].districts[i].text;
        option.value = cities_data[strSehir_ID].districts[i].value.toString();
        objIlceler.appendChild(option);

      }

    } catch (error) {
      console.error("An error occurred in fnIlceler:", error);
      // Handle the error or report it to the user here
    }
  }


  // Define fnSehirler next
  fnSehirler() {

    try {
      let objSehirler = document.querySelector("#select") as HTMLSelectElement;
      if (!objSehirler) throw new Error("Select element not found");

      let option = document.createElement("option");
      if (!option) throw new Error("Option element not created");

      for (let i = 0; i < this.objCities.length; i++) {
        option = document.createElement("option");
        if (!option) throw new Error("Option element not created");

        option.text = this.objCities[i].text;
        option.value = this.objCities[i].value.toString();
        objSehirler.appendChild(option);
      }

      objSehirler.addEventListener("click", (event) => {
        let strSehir_ID = objSehirler.selectedIndex;
        this.fnIlceler(strSehir_ID - 1);
      });

    } catch (error) {
      console.error("An error occurred in fnSehirler:", error);
      // Handle the error or report it to the user here
    }
  }

  get firstName() { return this.checkoutForm.get('firstName') }
  get lastName() { return this.checkoutForm.get('lastName') }
  get address() { return this.checkoutForm.get('address') }
  get phone() { return this.checkoutForm.get('phone') }
  get email() { return this.checkoutForm.get('email') }
}
