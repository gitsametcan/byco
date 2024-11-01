import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-nav',
  templateUrl: './shared-nav.component.html',
  styleUrls: ['./shared-nav.component.scss']
})
export class SharedNavComponent {
  isSubMenuVisible = false;
  selectedCategory: any = null; // Seçilen ana başlık için değişken
  hideTimeout: any; // Gecikmeli kapanış için zamanlayıcı

  categories = [
    {
      name: 'Aydınlatma',
      subCategories: [
        { name: 'Ampuller', thirdLevels: [{ name: 'Led Ampuller' }, { name: 'Rustik Led Ampul' }, {name: 'Flamanlı Led Ampul'}, {name: 'Florasan Ampuller'}] },
        { name: 'Tamamlayıcı Ürünler', thirdLevels: [{ name: 'Duylar' }, { name: 'Trafo ve Driver' }, {name: 'Sensörler'},{name: 'Fotosel'}, {name: 'Raylar Ve Aksesuarları'}, {name: 'Aydınlatma Kumandaları'}, {name: 'Aydınlatma Aksesuarları'}] },
        { name: 'İç Mekan Aydınlatma', thirdLevels: [{ name: 'Led Spot Armatürleri' }, { name: 'Sensörlü Armatürler' }, {name: 'Led Şeritler'}, {name: 'Işıldak ve El Fenerleri'}, {name: 'Tavan Armatürler'}, {name: 'Led Ray Spotlar'}, {name: 'Bant Armatür'}, {name: 'Dekoratif Spot Armatürler'}, {name: 'Duvar Armatürleri ve Aplikler'}, {name: '60x60 Led Panel'}, {name: 'Etanj Armatürler'}, {name: 'Led Panel'}] },
        { name: 'Dış Mekan Aydınlatma', thirdLevels: [{ name: 'Bahçe Aydınlatma Armatürleri' }, { name: 'Şerit&Neon Led' }, {name: 'Wallwasher'}, {name: 'Yol Ve Sokak Aydınlatma Armatürleri'}, {name: 'Havuz Armatürleri'}, {name: 'Solar Aydınlatma'}] }
      ]
    },
    {
      name: 'Anahtar Priz',
      subCategories: [
        { name: 'Anahtarlar', thirdLevels: [{ name: 'Tekli Anahtar' }, { name: 'Çiftli Anahtar' }] }
      ]
    }
  ];

  showSubMenu(category: any) {
    clearTimeout(this.hideTimeout); // Zamanlayıcıyı sıfırla
    this.isSubMenuVisible = true;
    this.selectedCategory = category; // Tıklanan kategoriyi ayarla
  }

  hideSubMenu() {
    this.hideTimeout = setTimeout(() => {
      this.isSubMenuVisible = false;
      this.selectedCategory = null; // Menü kapanınca seçimi temizle
    }, 300); // 300 ms gecikme
  }
}


