import { Component } from '@angular/core';

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




  public genderSelectOptions = [
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
    { value: 'others', text: 'Others' },
  ];

  public kategoriSec = [
    { value: 'elektrik', text: 'elektrik' },
    { value: 'kablo', text: 'kablo' },
    { value: 'diger', text: 'diger' },
  ];

  urundeneme = {
    stok: '',
    ad: '',
    aciklama: '',
    kategori:'',
    img:'',
    fiyat: ''
  }

  

  myObject = {
    adsoyad: 'Süleyman Rıfkı',
    mail: 'byco@byco.com.tr',
    dogum: '23.04.1920',
    vkno: '12345678910',
    tip: '1',
    tel: '05555555555',
    adress: 'Byco Mahallesi, Byco sokak, Byco Apartmanı, No:23'
  };

  siparislerimDeneme = [
    { no: '254789', musteri:'Enka', urunadedi: '2',tarih: '01.02.2014',tutar: '245', durum: 'yolda', },
    { no: '154865', musteri:'Berk CAn', urunadedi: '8',tarih: '01.02.2014',tutar: '714', durum: 'hazirlaniyor', },
    { no: '486154', musteri:'Finnaz Ay', urunadedi: '7',tarih: '01.02.2014',tutar: '743', durum: 'teslim', },
    { no: '789524', musteri:'Süleyman Rıfkı', urunadedi: '4',tarih: '01.02.2014',tutar: '22458', durum: 'hata', },
    { no: '215674', musteri:'DUNYA', urunadedi: '6',tarih: '01.02.2014',tutar: '12', durum: 'yolda', },
    { no: '456846', musteri:'Şevket Er', urunadedi: '1',tarih: '01.02.2014',tutar: '122422', durum: 'yolda', },
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
    console.log(this.myObject);
    
  this.infoUpdated= true;
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
    console.log('Select Kategori:', );

  }
}
