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
      this.orderId = this.getCookie("sonsiparisno")!;
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
  
    fetchOrderDetails(orderId: string) {
      // API çağrısı ile sipariş detaylarını getir
    }
}
