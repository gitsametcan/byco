import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.scss']
})
export class PaymentSuccessfulComponent {

    

    constructor(private route: ActivatedRoute) {}

    orderId: string = '';
  
    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.orderId = params['orderid'];
        this.fetchOrderDetails(this.orderId);
      });
    }
  
    fetchOrderDetails(orderId: string) {
      // API çağrısı ile sipariş detaylarını getir
    }
}
