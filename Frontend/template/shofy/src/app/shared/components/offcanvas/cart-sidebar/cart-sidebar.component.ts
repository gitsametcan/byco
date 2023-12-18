import { Component } from '@angular/core';
import { CartService } from '@/shared/services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent {

  constructor(public cartService:CartService){}
}
