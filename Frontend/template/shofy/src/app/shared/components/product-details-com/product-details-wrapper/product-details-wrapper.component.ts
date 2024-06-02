import { Component, Input } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from '@/shared/services/cart.service';

@Component({
  selector: 'app-product-details-wrapper',
  templateUrl: './product-details-wrapper.component.html',
  styleUrls: ['./product-details-wrapper.component.scss'],
})
export class ProductDetailsWrapperComponent {
  @Input() product!: IProduct;
  @Input() isShowBottom: boolean = true;

  textMore = false;
  yeniFiyat: string = "";
  userid: number = -1;

  benimUrl = "http://37.148.209.150:5001/api";

  handleTextToggle() {
    this.textMore = !this.textMore;
  }

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {}

  handleIsColorVariant(product: IProduct) {
    if (product.imageURLs.some((item) => item?.color && item?.color?.name)) {
      return true;
    } else {
      return false;
    }
  }

  myObject = {
    user_id: "",
    adsoyad: 'Süleyman Rıfkı',
    email: 'byco@byco.com.tr',
    vkno: '12345678910',
    tip: '5',
    telefon: '05555555555',
    adres: 'Byco Mahallesi, Byco sokak, Byco Apartmanı, No:23',
    discount : '00'
  };

  ngOnInit() {
    this.getIdFromSession();
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

  getUserById(){
    this.sendRequest('User/GetResponseById/'+ this.userid,'GET')
    .then(response => {
      console.log(response.data);
      this.myObject=response.data;
    })
    .catch(err => {
      console.error("Error: " + err);
      //this.router.navigate(['/pages/login']);
    })
  }

  urunuSil(product:IProduct){
    this.sendRequest('Urun/Delete/'+ product.id,'DELETE')
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.error("Error: " + err);
    })

  }

  fiyatGuncelle(){
    console.log(this.yeniFiyat);

  }

}
