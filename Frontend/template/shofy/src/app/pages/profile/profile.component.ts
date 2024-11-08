import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { URL } from '@/shared/services/url';

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
  userid: number = -1;
  urunTuru: string = '';
  newCategory: string = '';
  siparisler: any[] = [];
  selectedSiparisId: number | null = null;
  //benimUrl = this.urlhost.geturl();


  constructor(private router: Router, private toastrService: ToastrService) { }

  public kategoriSec: { value: string; text: string }[] = []; // Türü { value: string; text: string }[] olarak belirledik
  public urunTurleriOptions: { value: string; text: string }[] = [];


  public genderSelectOptions = [
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
    { value: 'others', text: 'Others' },
  ];

  public urunTurleri: string[] = [
    'Aydınlatma',
    'Anahtar Priz',
    'Enerji Kabloları',
    'Zayıf Akım Kabloları',
    'Şalt Malzemeler',
    'Elektrik Tesisat Ürünleri',
    'Grup Priz/Fiş',
    'Diafon/Güvenlik',
    'Ses/Görüntü',
    'Fan/Aspiratör'
  ];

  urundeneme = {
    ad: '',
    kategori: '',
    img: '',
    kod: '',
    aciklama: '',

    amper: '',
    aydinlatmaTuru: '',
    cerceve: '',
    damarSayisi: '',

    disKilifRengi: '',
    duy: '',
    isikRengi: '',
    kabloTipi: '',

    kabloUzunlugu: '',
    kanalBoyutu: '',
    kanalOzelligi: '',
    kanalRengi: '',

    kasaRengi: '',
    kesit: '',
    kesmeKapasitesi: '',
    kullanimYeri: '',

    kutup: '',
    marka: '',
    model: '',
    prizSayisi: '',

    renk: '',
    renkSicakligiKelvin: '',
    sigortaSayisi: '',
    tip: '',

    tur: '',
    urun: '',
    urunOzelligi: '',
    urunTipi: '',

    watt: '',
    stok: '',
    fiyat: '',
    indirim: '',

  }

  gonderilecekUrun = {
    ad: '',
    kategori: '',
    img: '',
    kod: '',
    aciklama: '',

    amper: '',
    aydinlatmaTuru: '',
    cerceve: '',
    damarSayisi: '',

    disKilifRengi: '',
    duy: '',
    isikRengi: '',
    kabloTipi: '',

    kabloUzunlugu: '',
    kanalBoyutu: '',
    kanalOzelligi: '',
    kanalRengi: '',

    kasaRengi: '',
    kesit: '',
    kesmeKapasitesi: '',
    kullanimYeri: '',

    kutup: '',
    marka: '',
    model: '',
    prizSayisi: '',

    renk: '',
    renkSicakligiKelvin: '',
    sigortaSayisi: '',
    tip: '',

    tur: '',
    urun: '',
    urunOzelligi: '',
    urunTipi: '',

    watt: '',
    stok: 0,
    fiyat: 0,
    indirim: 0

  }



  myObject = {
    user_id: 0,
    ad: 'Süleyman',
    soyad: 'Rıfkı',
    email: 'byco@byco.com.tr',
    password: 'password',
    telefon: '555555555',
    tip: 0,
    tcknvkn: '12345678910',
    teslimatadresi: 'Evim Caddesi, Okul Sokak, No:23',
    faturaadresi: 'İşim Caddesi, Üniversite Sokak, No:23',
    indirim: 5
  };

  siparislerimDeneme = [
    { no: '254789', musteri: 'Enka', urunadedi: '2', tarih: '01.02.2014', tutar: '245', durum: 'yolda', },
    { no: '154865', musteri: 'Berk CAn', urunadedi: '8', tarih: '01.02.2014', tutar: '714', durum: 'hazirlaniyor', },
    { no: '486154', musteri: 'Finnaz Ay', urunadedi: '7', tarih: '01.02.2014', tutar: '743', durum: 'teslim', },
    { no: '789524', musteri: 'Süleyman Rıfkı', urunadedi: '4', tarih: '01.02.2014', tutar: '22458', durum: 'hata', },
    { no: '215674', musteri: 'DUNYA', urunadedi: '6', tarih: '01.02.2014', tutar: '12', durum: 'yolda', },
    { no: '456846', musteri: 'şevket er', urunadedi: '1', tarih: '01.02.2014', tutar: '122422', durum: 'yolda', },
    { no: '964215', musteri: 'Enka', urunadedi: '1', tarih: '01.02.2014', tutar: '987554', durum: 'yolda', }
  ];

  musterilerDeneme = [
    { id: "0", ad: 'Berk Can', tip: '1', sipsayi: '3', tutar: '245', indirim: '20', },
    { id: "1", ad: 'Tesla', tip: '2', sipsayi: '5', tutar: '714', indirim: '10', },
    { id: "2", ad: 'Süleyman Rıfkı', tip: '1', sipsayi: '10', tutar: '743', indirim: '0', },
    { id: "3", ad: 'ENKA', tip: '2', sipsayi: '8', tutar: '22458', indirim: '0', },
    { id: "4", ad: 'DUNYA', tip: '2', sipsayi: '132', tutar: '12', indirim: '12', },
    { id: "5", ad: 'Merve Gündoğdu', tip: '1', sipsayi: '1', tutar: '122422', indirim: '23', },
    { id: "6", ad: 'Binnaz Türker', tip: '1', sipsayi: '0', tutar: '987554', indirim: '65', }
  ];



  ngOnInit(): void {
    const token = this.getCookie("session_key");
    if (!token) {
        this.router.navigate(['/pages/login']); // Token yoksa login sayfasına yönlendir
    }
    this.getUserByToken();
    this.getKategoriListesi(); // Yeni kategori listesini çekme fonksiyonunu çağırın
    this.urunTurleriOptions = this.urunTurleri.map(tur => ({
      value: tur,
      text: tur
    }));
    this.getOrders();

  }


  getUserByToken(){
    this.sendRequestWithHeaders('User/GetUser','GET', {
      'Authorization': `Bearer ${this.getCookie("session_key")}`
    })
    .then(response => {
      console.log("geetuserbasarili");
      console.log(response);
      this.myObject=response;
    })
    .catch(err => {
      console.log("geetuserbasarilidegil");
      console.error("Error: " + err);
      //this.router.navigate(['/pages/login']);
    })
  }

  sendRequestWithHeaders(url: string, method: string, header?: any): Promise<any> {
    return fetch(`https://bycobackend.online:5001/api/${url}`, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: header,
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
      return response.json();
  })
  }
  sendRequestWithHeadersPost(url: string, method: string, data?:any, header?: any): Promise<any> {
    console.log("requesin içi"+JSON.stringify(data));
    return fetch(`https://bycobackend.online:5001/api/${url}`, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: header,
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



  logout() {
    // Çerezdeki tokeni silme
    this.setCookie("session_key", "", -1); // Çerezin geçerlilik süresini sıfır yaparak siliyoruz.

    // Kullanıcıyı login sayfasına yönlendir
    this.router.navigate(['/pages/login']);
    console.log("Çıkış yapıldı ve token silindi.");
}

  toggleDetails(siparisId: number) {
    this.selectedSiparisId = this.selectedSiparisId === siparisId ? null : siparisId;
  }

  calculateTotal(urunler: any[]): number {
    return urunler.reduce((total, urun) => total + (urun.fiyat * urun.stok), 0);
  }
  // Durumları Türkçe etiketlerle döndürür
getStatusLabel(durum: string): string {
  switch (durum) {
    case 'Kargoya Verildi':
      return 'Kargoya Verildi';
    case 'Ödeme Alındı':
      return 'Ödeme Alındı';
    case 'Teslim Edildi':
      return 'Teslim Edildi';
    default:
      return 'Bilinmeyen';
  }
}

// Duruma göre uygun bir CSS sınıfı döndürür
getStatusClass(durum: string): string {
  switch (durum) {
    case 'Kargoya Verildi':
      return 'status pending';
    case 'Ödeme Alındı':
      return 'status done';
    case 'Teslim Edildi':
      return 'status reply';
    default:
      return 'status hold';
  }
}

  getKategoriSecenek() {
    this.sendRequest('Kategori/GetAllValueText', 'GET')
      .then(response => {
        console.log(response);
        this.kategoriSec = response;


      })
      .catch(err => {
        console.error("Error: " + err);
        //this.router.navigate(['/pages/login']);
      })

  }
  getKategoriListesi() {
    this.sendLocalRequest('Kategori/GetAll', 'GET')
      .then((response: any) => {
        // Gelen veriyi formatlayarak dropdown için kullanıma uygun hale getirin
        this.kategoriSec = response.map((item: any) => ({
          value: item.id.toString(), // `id`'yi string olarak dönüştürdük
          text: `${item.urunturu} - ${item.ad}`
        }));
      })
      .catch(err => {
        console.error("Error fetching categories: ", err);
        this.toastrService.error('Kategoriler alınırken bir hata oluştu.', 'Hata');
      });
  }

  getMusteriler() {
    this.sendRequest('Satis/GetMusteriBilgileri', 'GET')
      .then(response => {
        console.log(response.data);
        this.musterilerDeneme = response.data;


      })
      .catch(err => {
        console.error("Error: " + err);
        //this.router.navigate(['/pages/login']);
      })
  }

  getOrders() {
    this.sendRequestWithHeaders('Siparis/GetAll', 'GET', {
      'Authorization': `Bearer ${this.getCookie("session_key")}`
    })
      .then(response => {
        console.log("burdayım be burda");
        console.log(response);
        this.siparisler = response;
      })
      .catch(err => {
        console.error("Error: " + err);
      });
  }


  getIdFromSession() {
    console.log("sessionkey ===" + this.getCookie("session_key"))
    this.sendRequest('Sessions/Validate/' + this.getCookie("session_key"), 'GET')
      .then(response => {
        console.log(response);
        this.userid = response;
        this.getUserById();

      })
      .catch(err => {
        console.error("Error: " + err);
        this.router.navigate(['/pages/login']);
      })

  }

  getUserById() {
    this.sendRequest('User/GetResponseById/' + this.userid, 'GET')
      .then(response => {
        console.log(response.data);
        this.myObject = response.data;
        if (this.myObject.tip == 0) {
          this.getMusteriler();
        }


      })
      .catch(err => {
        console.error("Error: " + err);
        //this.router.navigate(['/pages/login']);
      })
  }


  sendRequest(url: string, method: string, data?: any): Promise<any> {

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
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
  }
  sendLocalRequest(url: string, method: string, data?: any): Promise<any> {
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
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      });
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

  setCookie(name: string, value: string, days: number) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  changeHandler(selectedOption: { value: string; text: string }) {
    this.urundeneme.kategori = this.kategoriSec[Number(selectedOption.value) - 1].text;
  }
  urunTuruChangeHandler(selectedOption: { value: string; text: string }) {
    this.urunTuru = selectedOption.value;
  }
  updatePassword() {
    console.log('yeni =' + this.newPassword + ', eski =' + this.confirmPassword);
    if (this.newPassword === this.confirmPassword && this.confirmPassword.length > 7) {
      
      // Şifre güncelleme işlemi burada gerçekleştirilir
      this.sendRequestWithHeadersPost('User/UpdatePassword', 'PUT', this.confirmPassword,{
        'Authorization': `Bearer ${this.getCookie("session_key")}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
        .then(response => {
          console.log(response);
  
        })
        .catch(err => {
          console.error("Error: " + err);
          //this.router.navigate(['/pages/login']);
        })
      console.log('yeni =' + this.newPassword + ', eski =' + this.confirmPassword);
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

  updateDiscount(id: string, index: number) {
    let indirimReq = {
      kullanici_id: id,
      indirim_miktari: this.indirimyeni[index]
    }
  }

  updateInfo() {
    console.log(this.myObject);
    this.sendRequestWithHeadersPost('User/Update', 'PUT', this.myObject,{
      'Authorization': `Bearer ${this.getCookie("session_key")}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
      .then(response => {
        console.log(response);

      })
      .catch(err => {
        console.error("Error: " + err);
        //this.router.navigate(['/pages/login']);
      })
  }

  addCategory() {
    const kategori = {
      id: 0,
      ad: this.newCategory,
      urunturu: this.urunTuru
    };

    this.sendLocalRequest('Kategori/Add', 'POST', kategori)
      .then(response => {
        console.log('Kategori eklendi:', response);
        this.toastrService.success('Kategori başarıyla eklendi.', 'Başarılı');

        // Yeni Kategori ve Ürün Türü inputlarını sıfırla
        this.newCategory = '';
        this.urunTuru = ''; // Ürün Türü seçimini sıfırla
      })
      .catch(err => {
        console.error("Error adding category: ", err);
        this.toastrService.error('Kategori eklenirken bir hata oluştu.', 'Hata');
      });
  }




  addUrun() {
    console.log(this.urundeneme);
    this.gonderilecekUrun = {
      ad: this.urundeneme.ad,
      stok: Number(this.urundeneme.stok),
      aciklama: this.urundeneme.aciklama,
      img: this.urundeneme.img,
      fiyat: Number(this.urundeneme.fiyat),
      kategori: this.urundeneme.kategori,
      kod: this.urundeneme.kod,

      amper: this.urundeneme.amper,
      aydinlatmaTuru: this.urundeneme.aydinlatmaTuru,
      cerceve: this.urundeneme.cerceve,
      damarSayisi: this.urundeneme.damarSayisi,

      disKilifRengi: this.urundeneme.disKilifRengi,
      duy: this.urundeneme.duy,
      isikRengi: this.urundeneme.isikRengi,
      kabloTipi: this.urundeneme.kabloTipi,

      kabloUzunlugu: this.urundeneme.kabloUzunlugu,
      kanalBoyutu: this.urundeneme.kanalBoyutu,
      kanalOzelligi: this.urundeneme.kanalOzelligi,
      kanalRengi: this.urundeneme.kanalRengi,

      kasaRengi: this.urundeneme.kasaRengi,
      kesit: this.urundeneme.kesit,
      kesmeKapasitesi: this.urundeneme.kesmeKapasitesi,
      kullanimYeri: this.urundeneme.kullanimYeri,

      kutup: this.urundeneme.kutup,
      marka: this.urundeneme.marka,
      model: this.urundeneme.model,
      prizSayisi: this.urundeneme.prizSayisi,

      renk: this.urundeneme.renk,
      renkSicakligiKelvin: this.urundeneme.renkSicakligiKelvin,
      sigortaSayisi: this.urundeneme.sigortaSayisi,
      tip: this.urundeneme.tip,

      tur: this.urundeneme.tur,
      urun: this.urundeneme.urun,
      urunOzelligi: this.urundeneme.urunOzelligi,
      urunTipi: this.urundeneme.urunTipi,

      watt: this.urundeneme.watt,
      indirim: Number(this.urundeneme.indirim)

    }
    console.log("bue");
    console.log(this.gonderilecekUrun);
    this.sendLocalRequest('Urun/Add', 'POST', this.gonderilecekUrun)
      .then(response => {
        console.log(response.status);
      })
      .catch(err => {
        console.error("Error: " + err);
      })

    this.toastrService.success('Ürün başarıyla eklendi.', 'Başarılı');
  }
}
