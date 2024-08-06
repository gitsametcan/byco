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
  paymentInfoUpdated: boolean = false;

  currentStep: number = 0;
  titles: string[] = ['Kişisel Bilgilerim', 'Adres Bilgilerim', 'Ödeme Bilgilerim'];
  title: string = this.titles[0];
  subtitle: string = this.titles[0];
  nextButtonText: string = 'Sonraki Adım';
  previousButtonText: string = 'Önceki Adım';


  myObject = {
    user_id: "",
    adsoyad: '',
    email: '',
    vkno: '',
    tip: '1',
    telefon: '',
    adres: '',
    discount: '00',
    ccn: '',
    cardholder: '',
    validity: '',
    cvv: '',
    billingadress: '',
    select: '',
    selectstate: '',
    zip: '',
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

    // Update the 'city' form control with the selected option's value
    this.addressForm.patchValue({
      select: selectedOption.value,
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

  public paymentForm!: FormGroup;
  public paymentFormSubmitted = false;

  public addressForm!: FormGroup;
  public addressFormSubmitted = false
  isPersonalInfoCompleted: boolean = false;

  isBillingAddressSame: boolean = false;
  public shippingAddressForm!: FormGroup;

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
    this.paymentForm = new FormGroup({
      ccn: new FormControl(null),
      cardholder: new FormControl(null),
      validity: new FormControl(null),
      cvv: new FormControl(null),
      billingadress: new FormControl(null),
      select: new FormControl(null),
      selectstate: new FormControl(null),
      zip: new FormControl(null),
    })

    this.addressForm = new FormGroup({
      billingadress: new FormControl(null),
      select: new FormControl(null),
      selectstate: new FormControl(null),
      zip: new FormControl(null),
    })

    this.shippingAddressForm = new FormGroup({
      billingCheckbox: new FormControl(null),
      shippingaddress: new FormControl(null),
      shippingselect: new FormControl(null),
      shippingselectstate: new FormControl(null),
      shippingzip: new FormControl(null),
    })
  }

  updateInfo() {
    console.log(this.myObject);

    this.infoUpdated = true;
  }

  updatePaymentInfo() {
    console.log(this.myObject);

    this.paymentInfoUpdated = true;
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

  odemeYap(ccn: number, cardholder: string, validity: string, cvv: number, billingadress: string, select: string, selectstate: string, zip: number) {

    if (this.currentStep != 2)
      return;

    if (ccn == null || cardholder == null || validity == null || cvv == null || billingadress == null || select == null || selectstate == null || zip == null) {
      this.toastrService.error('Lütfen tüm alanları doldurunuz.', 'Hata');
      return;
    }

    console.log("adsoyad : " + this.myObject.adsoyad);
    console.log("email : " + this.myObject.email);
    console.log("vkno : " + this.myObject.vkno);
    console.log("tip : " + this.myObject.tip);
    console.log("telefon : " + this.myObject.telefon);
    console.log("adres : " + this.myObject.adres);
    console.log("discount : " + this.myObject.discount);
    console.log("ccn : " + ccn);
    console.log("cardholder : " + cardholder);
    console.log("validity : " + validity);
    console.log("cvv : " + cvv);
    console.log("billingadress : " + billingadress);
    console.log("select : " + select);
    console.log("selectstate : " + selectstate);
    console.log("zip : " + zip);

    console.log(this.cartService.getCartProducts());

    try {


      /*
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

      const validity = document.getElementById("validity-input") as HTMLInputElement;
      if (validity) {
        console.log("expiry-date : " + validity.value);
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
        console.log("selectcity : " + objSehirler[objSehirler.selectedIndex].textContent);
      }
      else {
        console.error("selectcity element not found");
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

      let phoneElement = document.querySelector("#tel") as HTMLInputElement;
      if (phoneElement) {
        console.log("tel : " + phoneElement.value);
      }
      else {
        console.error("phone element not found");
      }

      let emailElement = document.querySelector("#mail") as HTMLInputElement;
      if (emailElement) {
        console.log("email : " + emailElement.value);
      }
      else {
        console.error("email element not found");
      }

      let nameElement = document.querySelector("#adsoyad") as HTMLInputElement;
      if (nameElement) {
        console.log("name : " + nameElement.value);
      }
      else {
        console.error("name element not found");
      }

      let vkno = document.querySelector("#vkno") as HTMLInputElement;
      if (vkno) {
        console.log("vkno : " + vkno.value);
      }
      else {
        console.error("vkno element not found");
      }
      */



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

  previousStep() {
    if (this.currentStep == 0) {
      this.currentStep = 0;
    } else {
      this.currentStep = this.currentStep - 1;
    }
    this.nextButtonText = 'Sonraki Adım';
    this.title = this.titles[this.currentStep];
    this.subtitle = this.titles[this.currentStep];
  }

  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep = this.currentStep + 1;
      this.nextButtonText = 'Sonraki Adım';
      if (this.currentStep == 2) {
        this.nextButtonText = 'Ödeme Bilgilerini Tamamla';
      }
    } else if (this.currentStep == 2) {
      this.nextButtonText = 'Ödeme Bilgilerini Tamamla';
      this.togglePaymentModal();
    } else {
      this.nextButtonText = 'Sonraki Adım';
      this.currentStep = 0;
    }
    this.title = this.titles[this.currentStep];
    this.subtitle = this.titles[this.currentStep];
  }

  onBillingCheckboxClick() {
    this.isBillingAddressSame = !this.isBillingAddressSame;
  }

  siparisGonder() {

    if (this.isTermAccepted) {
      this.togglePaymentModal();
    } else {
      this.toastrService.error('Lütfen ödeme koşullarını kabul edin.', 'Hata');
    }

    /*
    try {
      const cardNumber = document.getElementById("card-number") as HTMLInputElement;
      const cardNameInput = document.getElementById("card-name-input") as HTMLInputElement;
      const validity = document.getElementById("validit y-input") as HTMLInputElement;
      const cvvInput = document.getElementById("cvv") as HTMLInputElement;

      //Reflip card
      document.addEventListener("click", () => {

      });

      window.onload = () => {
        cvvInput.value = "";
        validity.value = "";
        cardNameInput.value = "";
        cardNumber.value = "";
      };
    } catch (error) {
      console.error("Err");
    }
      */
  }

  onNumberChange() {
    const cardNumber = document.getElementById("ccn") as HTMLInputElement;
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
    const cardNameInput = document.getElementById("cardholder") as HTMLInputElement;
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
    const displayValidity = document.getElementById("displayvalidity") as HTMLInputElement;
    const validity = document.getElementById("validity") as HTMLInputElement;

    const inputString = validity.value;
    let formattedString = "";

    if (inputString.length < 1 || inputString.length > 5) {
      formattedString = "";
      displayValidity.innerText = formattedString;
      validity.value = formattedString;
    }
    //const parts = inputString.split("-");
    //const year = parts[0].slice(2);
    //const month = parts[1];

    formattedString = inputString;
    validity.value = formattedString;
    displayValidity.innerText = formattedString;

    if (inputString.length == 3 && inputString[2] != "/") {
      formattedString = inputString.slice(0, 2) + "/" + inputString.slice(2, 3);
    } else if (inputString.length == 3 && inputString[2] == "/") {
      formattedString = inputString.slice(0, 2);
    } else if (inputString.length > 3) {
      formattedString = inputString.slice(0, 2) + "/" + inputString.slice(3, 5);
    }

    if (parseInt(inputString.slice(0, 2)) > 12 || parseInt(inputString.slice(0, 2)) < 0) {
      formattedString = "0" + inputString.slice(0, 1) + "/" + "25";
    }
    validity.value = formattedString;
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
        var ccn = ccnElement.value;
        if (ccn.length >= 16) {
          ccnElement.value = ccn.substring(0, 4) + " " + ccn.substring(4, 8) + " " + ccn.substring(8, 12) + " " + ccn.substring(12, 16);
        } else {
          //ccnElement.value = "";
        }
      }
      else {
        console.error("ccn element not found");
      }
    }

    checkexpiry() {
      let expiryElement = document.querySelector("#validity") as HTMLInputElement;
      if (expiryElement) {
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
  fnIlceler(strSehir_ID: number, isShipping: boolean = false) {
    try {
      if (isShipping) {
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
      } else {
        let objIlceler2 = document.querySelector("#shippingselectstate") as HTMLSelectElement;
        if (!objIlceler2) throw new Error("Select element not found");
        while (objIlceler2.options.length > 0) {
          objIlceler2.remove(0);
        }
        let option = document.createElement("option");
        if (!option) throw new Error("Option element not created");

        for (let i = 0; i < cities_data[strSehir_ID].districts.length; i++) {

          option = document.createElement("option");
          if (!option) throw new Error("Option element not created");

          option.text = cities_data[strSehir_ID].districts[i].text;
          option.value = cities_data[strSehir_ID].districts[i].value.toString();
          objIlceler2.appendChild(option);
        }
      }

    } catch (error) {
      console.error("An error occurred in fnIlceler:", error);
      // Handle the error or report it to the user here
    }
  }


  // Define fnSehirler next
  fnSehirler() {

    let objSehirler: HTMLSelectElement | null = document.querySelector("#select");
    let objSehirler2: HTMLSelectElement | null = document.querySelector("#shippingselect");
    let option: HTMLOptionElement | null = document.createElement("option");

    try {
      //if (!objSehirler) throw new Error("Select element not found");
      if (!objSehirler2) return;

      for (let i = 0; i < this.objCities.length; i++) {
        option = document.createElement("option");
        if (!option) throw new Error("Option element not created");

        option.text = this.objCities[i].text;
        option.value = this.objCities[i].value.toString();
        objSehirler2.appendChild(option.cloneNode(true));
        if (!objSehirler) continue;
        objSehirler?.appendChild(option);
      }

      objSehirler2.addEventListener("click", (event) => {
        if (!objSehirler2) return;
        let strSehir_ID2 = objSehirler2.selectedIndex;
        this.fnIlceler(strSehir_ID2 - 1, false);
      });

      if (!objSehirler) return;

      objSehirler?.addEventListener("click", (event) => {
        if (!objSehirler) return;
        let strSehir_ID = objSehirler?.selectedIndex;
        this.fnIlceler(strSehir_ID - 1, true);
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

  get ccn() { return this.paymentForm.get('ccn') }
  get cardholder() { return this.paymentForm.get('cardholder') }
  get validity() { return this.paymentForm.get('validity') }
  get cvv() { return this.paymentForm.get('cvv') }

  get billingadress() { return this.addressForm.get('billingadress') }
  get select() { return this.addressForm.get('select') }
  get selectstate() { return this.addressForm.get('selectstate') }
  get zip() { return this.addressForm.get('zip') }
}
