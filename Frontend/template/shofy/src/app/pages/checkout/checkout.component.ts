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
    
    
    benimUrl = "https://localhost:44313/api";

    public checkouts: checkk ={};
    
    public urunler: IProduct[] = [];

  isOpenLogin = false;
  isOpenCoupon = false;
  shipCost: number = 0;
  couponCode: string = '';
  payment_name: string = '';

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
      company:new FormControl(null),
      country:new FormControl(null,Validators.required),
      address:new FormControl(null,Validators.required),
      city:new FormControl(null,Validators.required),
      state:new FormControl(null,Validators.required),
      zipCode:new FormControl(null,Validators.required),
      phone:new FormControl(null,Validators.required),
      orderNote:new FormControl(null),
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
    this.checkouts.isim = this.checkoutForm.get("firstName")?.value;
    this.checkouts.soyisim = this.checkoutForm.get("lastName")?.value;
    this.checkouts.sirket_adi = this.checkoutForm.get("company")?.value;
    this.checkouts.ulke = this.checkoutForm.get("country")?.value;
    this.checkouts.adres_satiri = this.checkoutForm.get("address")?.value;
    this.checkouts.il_ilce = this.checkoutForm.get("city")?.value;
    this.checkouts.kita = this.checkoutForm.get("state")?.value;
    this.checkouts.posta_kodu = this.checkoutForm.get("zipCode")?.value;
    this.checkouts.telefon = this.checkoutForm.get("phone")?.value;
    this.checkouts.email = this.checkoutForm.get("email")?.value;
    this.checkouts.siparis_notu = this.checkoutForm.get("orderNote")?.value;

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
  get company() { return this.checkoutForm.get('company') }
  get country() { return this.checkoutForm.get('country') }
  get address() { return this.checkoutForm.get('address') }
  get city() { return this.checkoutForm.get('city') }
  get state() { return this.checkoutForm.get('state') }
  get zipCode() { return this.checkoutForm.get('zipCode') }
  get phone() { return this.checkoutForm.get('phone') }
  get orderNote() { return this.checkoutForm.get('orderNote') }
  get email() { return this.checkoutForm.get('email') }
}
