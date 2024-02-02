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
    
    
    benimUrl = "http://localhost:5141/api";

    public checkouts: checkk ={};
    
    public urunler: IProduct[] = [];

  isOpenLogin = false;
  isOpenCoupon = false;
  shipCost: number = 0;
  couponCode: string = '';
  payment_name: string = '';

  myObject = {
    adsoyad: 'Süleyman Rıfkı',
    mail: 'byco@byco.com.tr',
    dogum: '23.04.1920',
    vkno: '12345678910',
    tip: '1',
    tel: '05555555555',
    adress: 'Byco Mahallesi, Byco sokak, Byco Apartmanı, No:23'
  };

  constructor(public cartService: CartService,private toastrService: ToastrService) { }

  handleOpenLogin() {
    this.isOpenLogin = !this.isOpenLogin;
  }
  handleOpenCoupon() {
    this.isOpenCoupon = !this.isOpenCoupon;
  }

  handleShippingCost(value: number | string) {
    if (value === 'free') {
      this.shipCost = 0;
    } else {
      this.shipCost = value as number;
    }
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
      firstName:new FormControl(null,Validators.required),
      lastName:new FormControl(null,Validators.required),
      address:new FormControl(null,Validators.required),
      phone:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
    })
    this.urunler = this.cartService.getCartProducts();
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.checkoutForm.valid) {
      console.log('checkout-form-value', this.checkoutForm);
      this.toastrService.success(`Order successfully`);
      this.checkoutDoldur();
      this.GetPostChechout(this.checkouts);
      
    
      this.checkoutForm.reset();
      this.formSubmitted = false; // Reset formSubmitted to false
    }
    console.log(this.cartService.getCartProducts());
    //console.log('checkout-form', this.checkoutForm.value);
  }

  checkoutDoldur(){
    console.log("checkdoldur");
    this.checkouts.isim = this.checkoutForm.get("firstName")?.value;
    this.checkouts.vkn = this.checkoutForm.get("lastName")?.value;
    this.checkouts.ulke = this.checkoutForm.get("country")?.value;
    this.checkouts.adres_satiri = this.checkoutForm.get("address")?.value;
    this.checkouts.telefon = this.checkoutForm.get("phone")?.value;
    this.checkouts.email = this.checkoutForm.get("email")?.value;

    this.checkouts.satilan_urunler=[];

    for(let product of this.urunler){
        this.checkouts.satilan_urunler?.push(product.id.toString());
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

  get firstName() { return this.checkoutForm.get('firstName') }
  get lastName() { return this.checkoutForm.get('lastName') }
  get address() { return this.checkoutForm.get('address') }
  get phone() { return this.checkoutForm.get('phone') }
  get email() { return this.checkoutForm.get('email') }
}
