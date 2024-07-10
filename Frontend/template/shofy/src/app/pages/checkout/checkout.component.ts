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
    adsoyad: '',
    email: '',
    vkno: '',
    tip: '1',
    telefon: '',
    adres: '',
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

      const cardNameInput = document.getElementById("card-name-input") as HTMLInputElement;
      if (cardNameInput) {
        console.log("cardholder-name : " + cardNameInput.value);
      }
      else {
        console.error("cardholder-name element not found");
      }

      const cardNumber = document.getElementById("card-number") as HTMLInputElement;
      if (cardNumber) {
        console.log("ccn : " + cardNumber.value);
      }
      else {
        console.error("ccn element not found");
      }

      const validityInput = document.getElementById("validity-input") as HTMLInputElement;
      if (validityInput) {
        console.log("expiry-date : " + validityInput.value);
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

      let adresElement = document.querySelector("#billing-address") as HTMLInputElement;
      if (adresElement) {
        console.log("address : " + adresElement.value);
      }
      else {
        console.error("address element not found");
      }

      let objSehirler = document.querySelector("#select") as HTMLSelectElement;
      if (objSehirler) {
        console.log("select : " + objSehirler[objSehirler.selectedIndex].textContent);
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
    try {
      const cardNumber = document.getElementById("card-number") as HTMLInputElement;
      const cardNameInput = document.getElementById("card-name-input") as HTMLInputElement;
      const validityInput = document.getElementById("validity-input") as HTMLInputElement;
      const cvvInput = document.getElementById("cvv") as HTMLInputElement;

      //Reflip card
      document.addEventListener("click", () => {
        
      });

      window.onload = () => {
        cvvInput.value = "";
        validityInput.value = "";
        cardNameInput.value = "";
        cardNumber.value = "";
      };
    } catch (error) {
      console.error("Err");
    }
      */
  }

  onNumberChange() {
    const cardNumber = document.getElementById("card-number") as HTMLInputElement;
    const cardNumberDisplay = document.querySelectorAll(".card-number-display");
    let currentSpanIndex = 0;

    const inputNumber = cardNumber.value.replace(/\D/g, "");
    cardNumber.value = cardNumber.value.slice(0, 16).replace(/\D/g, "");

    for (let i = 0; i < cardNumberDisplay.length; i++) {
      if (i < inputNumber.length) {
        cardNumberDisplay[i].textContent = inputNumber[i];
      } else {
        cardNumberDisplay[i].textContent = "_";
      }
    }

    if (inputNumber.length <= cardNumberDisplay.length) {
      currentSpanIndex = inputNumber.length;
    } else {
      currentSpanIndex = cardNumberDisplay.length;
    }
  }

  onCardNameChange() {
    const cardHolderName = document.getElementById("card-holder-name") as HTMLInputElement;
    const cardNameInput = document.getElementById("card-name-input") as HTMLInputElement;
    cardHolderName.innerText = cardNameInput.value;

    if (cardNameInput.value.length < 1) {
      cardHolderName.innerText = "Your Name Here";
    } else if (cardNameInput.value.length > 30) {
      cardNameInput.value = cardNameInput.value.slice(0, 30);
    } else {
      cardHolderName.innerText = cardNameInput.value;
    }
  }

  validateExpiryDate() {
    const displayValidity = document.getElementById("validity") as HTMLInputElement;
    const validityInput = document.getElementById("validity-input") as HTMLInputElement;

    const inputString = validityInput.value;
    let formattedString = "";

    if (inputString.length < 1 || inputString.length > 5) {
      formattedString = "";
      displayValidity.innerText = formattedString;
      validityInput.value = formattedString;
    }
    //const parts = inputString.split("-");
    //const year = parts[0].slice(2);
    //const month = parts[1];

    formattedString = inputString;
    validityInput.value = formattedString;
    displayValidity.innerText = formattedString;

    if (inputString.length == 3 && inputString[2] != "/") {
      formattedString = inputString.slice(0, 2) + "/" + inputString.slice(2, 3);
    } else if (inputString.length == 3 && inputString[2] == "/") { 
      formattedString = inputString.slice(0, 2);
    } else if (inputString.length > 3) {
      formattedString = inputString.slice(0, 2) + "/" + inputString.slice(3 , 5);
    }

    if (parseInt(inputString.slice(0, 2)) > 12 || parseInt(inputString.slice(0, 2)) < 0) {
      formattedString = "0" + inputString.slice(0, 1) + "/" + "25";
    }
    validityInput.value = formattedString;
    displayValidity.innerText = formattedString;
  }

  onCVVChange() {
    const cvvInput = document.getElementById("cvv") as HTMLInputElement;
    const cvvDisplay = document.getElementById("cvv-display") as HTMLInputElement;
    cvvDisplay.innerText = cvvInput.value;

    const userInput = cvvInput.value;
    const sanitizedInput = userInput.slice(0, 4);
    const numericInput = sanitizedInput.replace(/\D/g, "");
    cvvInput.value = numericInput;
    cvvDisplay.innerText = numericInput;
  }

  onCVVclick() {
    document.getElementById("card")!.style.transform = "rotateY(180deg)";
  }

  onCVVnotfocused() {
    if (document.activeElement!.id != "cvv") {
      document.getElementById("card")!.style.transform = "rotateY(0deg)";
    }
  }

  onAddressChange() {
    const addressInput = document.getElementById("billing-address") as HTMLInputElement;
    addressInput.innerText = addressInput.value;

    if (addressInput.value.length < 1) {
      addressInput.innerText = "Your Address Here";
    } else if (addressInput.value.length > 50) {
      addressInput.value = addressInput.value.slice(0, 50);
    } else {
      addressInput.innerText = addressInput.value;
    }
  }


  /*
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
            || parseInt(expiryElement.value.substring(0, 2)) < 1) {
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
  */
    checkzip() {
      let zipElement = document.querySelector("#zip") as HTMLInputElement;
      if (zipElement) {
        var zip = zipElement.value;
        if (zip.length >= 5) {
          zipElement.value = zip.substring(0, 5);
        } else {
          zipElement.value = zipElement.value;
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
