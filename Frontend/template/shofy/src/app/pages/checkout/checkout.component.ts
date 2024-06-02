import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '@/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '@/types/product-type';
import { checkk } from '@/types/checkt-type';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
    
    
    benimUrl = "http://37.148.209.150:5001/api";

    public checkouts: checkk ={};
    
    public urunler: IProduct[] = [];

  isOpenLogin = false;
  isOpenCoupon = false;
  isUserLogin = false;
  
  infoUpdated: boolean = false;
  shipCost: number = 0;
  couponCode: string = '';
  payment_name: string = '';
  userid: number = -1;
  discount:number = 0;
  

  myObject = {
    user_id: "",
    adsoyad: 'Süleyman Rıfkı',
    email: 'byco@byco.com.tr',
    vkno: '12345678910',
    tip: '1',
    telefon: '05555555555',
    adres: 'Byco Mahallesi, Byco sokak, Byco Apartmanı, No:23',
    discount : '00'
  };

  constructor(public cartService: CartService,private toastrService: ToastrService) { }

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
  



  ngOnInit () {
    this.checkoutForm = new FormGroup({
      firstName:new FormControl(null),
      lastName:new FormControl(null),
      address:new FormControl(null),
      phone:new FormControl(null),
      email:new FormControl(null),
    })
    this.urunler = this.cartService.getCartProducts();
    this.getIdFromSession();
  }

  updateInfo() {
    console.log(this.myObject);
    
  this.infoUpdated= true;
  }

//   onSubmit() {
//     console.log("sadad");
//     console.log('checkout-form-value', this.checkoutForm);
//     this.formSubmitted = true;
//     if (this.checkoutForm.valid) {
//       console.log('checkout-form-value', this.checkoutForm);
//       this.toastrService.success(`Order successfully`);
//       this.checkoutDoldur();
//       this.GetPostChechout(this.checkouts);
      
    
//       this.checkoutForm.reset();
//       this.formSubmitted = false; // Reset formSubmitted to false
//     }
//     console.log(this.cartService.getCartProducts());
//     //console.log('checkout-form', this.checkoutForm.value);
//   }

  checkoutDoldur(){
    console.log("checkdoldur");
    this.checkouts.session_key = String(this.getCookie("session_key"));


    

    this.checkouts.satilan_urunler=[];


    for(let product of this.urunler){
        let ikili:string[]=[]
        ikili?.push(product.id.toString());
        ikili?.push(product.orderQuantity!.toString());
        this.checkouts.satilan_urunler?.push(ikili);
    }

  }
  
  GetPostChechout(checkout:checkk){
    this.sendRequest('Satis/MakePurchase','POST',checkout)
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error("Error: " + err);
    })

  }

  getIdFromSession(){
    console.log("sessionkey ===" + this.getCookie("session_key"))
    this.sendRequest('Sessions/Validate/'+ this.getCookie("session_key"),'GET')
    .then(response => {
      console.log(response);
      this.userid=response;
      this.getUserById();
      
    })
    .catch(err => {
      console.error("Error: " + err);
    })

  }

  getUserById(){
    this.sendRequest('User/GetResponseById/'+ this.userid,'GET')
    .then(response => {
      console.log(response.data);
      this.myObject=response.data;
      this.isUserLogin=true;
      this.calculateDisc();

      
    })
    .catch(err => {
      console.error("Error: " + err);
      //this.router.navigate(['/pages/login']);
    })
  }

  calculateDisc(){
    
    let sayi = Number(this.myObject.discount)
    this.discount = (this.cartService.totalPriceQuantity().total * sayi) / 100;
  }
  


  getCookie(name:string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  sendRequest(url: string, method: string, data?:any): Promise<any> {
    console.log("requesin içi"+JSON.stringify(data));
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

  siparisGonder(){
    this.checkoutDoldur();
    console.log(this.checkouts)
    this.sendRequest('Satis/MakePurchase','POST',this.checkouts)
    .then(response => {
        this.cartService.clear_cartp();

      console.log(response);
    })
    .catch(err => {
      console.error();
    })
    this.cartService.clear_cartp();
  }

  get firstName() { return this.checkoutForm.get('firstName') }
  get lastName() { return this.checkoutForm.get('lastName') }
  get address() { return this.checkoutForm.get('address') }
  get phone() { return this.checkoutForm.get('phone') }
  get email() { return this.checkoutForm.get('email') }
}
