import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

    oldPassword: string = '';
  newPassword: string = '';
  newCategoy: string = '';
  confirmPassword: string = '';
  indirimyeni: string[] = [];
  //indirimyeni: string = 'Buraya';
  passwordUpdated: boolean = false;
  infoUpdated: boolean = false;
  passwordMismatch: boolean = false;
  userid:number = -1;

  benimUrl = "https://localhost:44313/api";


  constructor(private router: Router) { }


  public genderSelectOptions = [
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
    { value: 'others', text: 'Others' },
  ];

  public kategoriSec = [
    { value: 'elektrik', text: 'Elektrik' },
    { value: 'kablo', text: 'Kablo' },
    { value: 'diger', text: 'diger' },
  ];

  urundeneme = {
    ad: '',
    stok: '',
    aciklama: '',
    kategori:'',
    img:'',
    fiyat: ''
  }

  gonderilecekUrun = {
    ad: "denem",
    stok: 6,
    aciklama: "denemeler",
    kategori_id: 2,
    img: "dememelerimg",
    fiyat: 23

  }

  

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

  siparislerimDeneme = [
    { no: '254789', musteri:'Enka', urunadedi: '2',tarih: '01.02.2014',tutar: '245', durum: 'yolda', },
    { no: '154865', musteri:'Berk CAn', urunadedi: '8',tarih: '01.02.2014',tutar: '714', durum: 'hazirlaniyor', },
    { no: '486154', musteri:'Finnaz Ay', urunadedi: '7',tarih: '01.02.2014',tutar: '743', durum: 'teslim', },
    { no: '789524', musteri:'Süleyman Rıfkı', urunadedi: '4',tarih: '01.02.2014',tutar: '22458', durum: 'hata', },
    { no: '215674', musteri:'DUNYA', urunadedi: '6',tarih: '01.02.2014',tutar: '12', durum: 'yolda', },
    { no: '456846', musteri:'şevket er', urunadedi: '1',tarih: '01.02.2014',tutar: '122422', durum: 'yolda', },
    { no: '964215', musteri:'Enka', urunadedi: '1',tarih: '01.02.2014',tutar: '987554', durum: 'yolda', }
  ];

  musterilerDeneme = [
    { id:"0", ad: 'Berk Can', tip: '1',sipsayi: '3',tutar: '245', indirim: '20', },
    { id:"1", ad: 'Tesla', tip: '2',sipsayi: '5',tutar: '714', indirim: '10', },
    { id:"2", ad: 'Süleyman Rıfkı', tip: '1',sipsayi: '10',tutar: '743', indirim: '0', },
    { id:"3", ad: 'ENKA', tip: '2',sipsayi: '8',tutar: '22458', indirim: '0', },
    { id:"4", ad: 'DUNYA', tip: '2',sipsayi: '132',tutar: '12', indirim: '12', },
    { id:"5", ad: 'Merve Gündoğdu', tip: '1',sipsayi: '1',tutar: '122422', indirim: '23', },
    { id:"6", ad: 'Binnaz Türker', tip: '1',sipsayi: '0',tutar: '987554', indirim: '65', }
  ];

  ngOnInit():void{
    this.getIdFromSession();
    this.getOrder();
    this.getKategoriSecenek();
    
  }

  logout(){
    console.log(this.getCookie("session_key"))
    this.sendRequest('User/LogOut/'+this.getCookie("session_key"),'GET')
    .then(response => {
        this.setCookie("","",0);

        this.router.navigate(['/pages/login']);
        this.ngOnInit();

      
    })
    .catch(err => {
      console.error("Error: " + err);

      this.router.navigate(['/pages/login']);
    })
    
  }

  getKategoriSecenek(){
    this.sendRequest('Kategori/GetAllValueText','GET')
    .then(response => {
      console.log(response);
      this.kategoriSec=response;

      
    })
    .catch(err => {
      console.error("Error: " + err);
      //this.router.navigate(['/pages/login']);
    })

  }

  getMusteriler(){
    this.sendRequest('Satis/GetMusteriBilgileri','GET')
    .then(response => {
      console.log(response.data);
      this.musterilerDeneme=response.data;

      
    })
    .catch(err => {
      console.error("Error: " + err);
      //this.router.navigate(['/pages/login']);
    })
  }

  getOrder(){
    this.sendRequest('Satis/GetSiparisBilgileri','GET')
    .then(response => {
      console.log(response.data);
      this.siparislerimDeneme=response.data;

      
    })
    .catch(err => {
      console.error("Error: " + err);
      //this.router.navigate(['/pages/login']);
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
      this.router.navigate(['/pages/login']);
    })

  }

  getUserById(){
    this.sendRequest('User/GetResponseById/'+ this.userid,'GET')
    .then(response => {
      console.log(response.data);
      this.myObject=response.data;
      if(this.myObject.tip=="0"){
        this.getMusteriler();
      }

      
    })
    .catch(err => {
      console.error("Error: " + err);
      //this.router.navigate(['/pages/login']);
    })
  }
  

  sendRequest(url: string, method: string, data?:any): Promise<any> {
    
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

  setCookie(name:string,value:string,days:number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
  
  changeHandler(selectedOption: { value: string; text: string }) {
    this.urundeneme.kategori = selectedOption.value;
  }

  updatePassword() {
    console.log('yeni =' + this.newPassword +', eski =' + this.confirmPassword);
    if (this.newPassword === this.confirmPassword && this.confirmPassword.length>7) {
      // Şifre güncelleme işlemi burada gerçekleştirilir
      console.log('yeni =' + this.newPassword +', eski =' + this.confirmPassword);
      console.log('Şifre güncellendi.');
      this.passwordUpdated = true;
      this.passwordMismatch = false;
      // Örneğin: AuthService aracılığıyla güncelleme işlemi yapılabilir
    } else {
      console.log('Yeni şifreler uyuşmuyor.');
      this.passwordMismatch = true;
      this.passwordUpdated = false;
    }
  }

  updateDiscount(id:string,index:number) {
    let indirimReq = {
        kullanici_id:id,
        indirim_miktari:this.indirimyeni[index]
    }
  }

  updateInfo() {
    this.sendRequest('Adres/SetAdres/'+ this.userid,'POST',this.myObject.adres)
    .then(response => {
      console.log(response);

      
    })
    .catch(err => {
      console.error("Error: " + err);
      //this.router.navigate(['/pages/login']);
    })
  }

  addCategory(){
    let kategori = {
        kategori_id: 0,
        parent_id : -1,
        ad: this.newCategoy}
    console.log("yeni kategori" + this.newCategoy);
  }

  addUrun(){
    console.log(this.urundeneme);
    this.gonderilecekUrun={
        ad: this.urundeneme.ad,
        stok: Number(this.urundeneme.stok),
        aciklama: this.urundeneme.aciklama,
        kategori_id: Number(this.urundeneme.kategori),
        img: this.urundeneme.img,
        fiyat: Number(this.urundeneme.fiyat)

    }
    console.log(this.gonderilecekUrun);
    this.sendRequest('Urun/Add','POST',this.gonderilecekUrun)
    .then(response => {
      console.log(response.status);
    })
    .catch(err => {
      console.error("Error: " + err);
    })

  }
}
