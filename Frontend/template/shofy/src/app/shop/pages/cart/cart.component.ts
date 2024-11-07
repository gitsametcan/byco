import { CartService } from '@/shared/services/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  couponCode: string = '';
  shipCost: number = 100; // Kargo ücreti varsayılan olarak 100 TL

  constructor (public cartService:CartService) {}

  handleCouponSubmit() {
    console.log(this.couponCode);
    // Add coupon code handling logic here
    if(this.couponCode){
      // logic here

      // when submitted the from than empty will be coupon code
      this.couponCode = ''
    }
  }

  handleShippingCost(value: number | string) {
    if (value === 'free') {
      this.shipCost = 0;
    } else {
      this.shipCost = value as number;
    }
  }
}
