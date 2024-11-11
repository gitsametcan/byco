import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { CartService } from '@/shared/services/cart.service';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.scss']
})
export class PaymentSuccessfulComponent {

    

    constructor(private router: Router,public cartService : CartService) {}

    orderId: string = '';
    protected remainingTime = 60;
    private intervalId: any;
  
    ngOnInit() {
      this.SendMessage();
      this.countDown();
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

      countDown() {
        this.intervalId = setInterval(() => {
          if (this.remainingTime <= 0) {
            clearInterval(this.intervalId);
            this.router.navigate(['/pages/shop']).then(r => console.log(r));
          }
          this.remainingTime--;
        }, 1000);
      }
  
    
      SendMessage() {
        const siparisno = this.getCookie("sonsiparisno");
        console.log("Sipariş No:", siparisno);
        
        if (!siparisno) {
          console.error("sonsiparisno is missing from cookies");
          return;
        }
      
        this.sendRequest('Siparis/SiparisOdemeTamam', 'POST', siparisno)
          .then(response => {
            this.cartService.clear_cart();
            console.log(response);
          })
          .catch(err => {
            console.error("Error:", err);
          });
      }
      
      

      sendRequest(url: string, method: string, data?: any): Promise<any> {
        console.log("Request URL:", `https://bycobackend.online:5001/api/${url}`);
        console.log("Request Method:", method);
        console.log("Request Headers:", {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });
        console.log("Request Data:", data);  // JSON.stringify yerine doğrudan data kullanıyoruz
        
        return fetch(`https://bycobackend.online:5001/api/${url}`, {
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
          body: data  // JSON.stringify yerine doğrudan data kullanıyoruz
        })
        .then(async response => {
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Error Response Text:", errorText);
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        });
      }
      
      
}
