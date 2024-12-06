import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';




interface Slide {
  image: string;
  title: string;
  link: string;
}


@Component({
  selector: 'app-shop-main-page',
  templateUrl: './shop-main-page.component.html',
  styleUrls: ['./shop-main-page.component.scss']
})
export class ShopMainPageComponent {
  products: IProduct[] = []; // Array to hold products for "Fırsat Ürünleri"
  featuredProducts: IProduct[] = []; // Array to hold products for "Öne Çıkanlar"
  displayedProducts: IProduct[] = []; // Array to display up to 10 products
  activeProductIndex: number = 0; // Track the active product index
  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  public searchText: string = ''; // Arama metni

  @ViewChild('swiperEl') swiperEl!: ElementRef & { swiper: Swiper };

  ngAfterViewInit() {
    // Swiper nesnesine erişim burada yapılabilir
    if (this.swiperEl && this.swiperEl.nativeElement.swiper) {
      console.log('Swiper instance initialized:', this.swiperEl.nativeElement.swiper);
    }
  }

  nextProduct() {
    this.swiperEl.nativeElement.swiper?.slideNext();
  }

  previousProduct() {
    this.swiperEl.nativeElement.swiper?.slidePrev();
  }
  


  constructor(private productService: ProductService,private router: Router) {}

  ngOnInit() {
    this.productService.getAllProjects().subscribe((data: IProduct[]) => {
      this.allProducts = data.filter(product => product.ad !== 'Kargo');
      this.updateDisplayedProducts();
      this.displayFeaturedProducts();
    });

  }

  selectTab(tab: string) {
    this.activeTab = tab;
    this.updateDisplayedProducts();
  }

  handleSearchSubmit() {
    if (this.searchText) {
      // Arama sorgusu ile belirli bir sayfaya yönlendir
      this.router.navigate(['/pages/search'], { queryParams: { searchText: this.searchText } });
    }
  }

  // Arama kutusunu kapatma işlevi
  closeSearch() {
    this.searchText = ''; // Arama kutusunu temizle
  }

  loadProducts() {
    this.productService.products.subscribe((data: IProduct[]) => {
        this.allProducts = data; // Tüm ürünleri al ve kaydet
        this.updateDisplayedProducts(); // Sekmeye göre görüntülenecek ürünleri ayarla
    });
}

  


  // Scroll to a specific product in the carousel
  scrollToProduct(index: number) {
    const carousel = document.querySelector('.product-carousel');
    const productElement = carousel?.children[index] as HTMLElement;
    productElement?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }

  // Method to handle mouse scroll for horizontal scrolling
  onMouseScroll(event: WheelEvent) {
    const carousel = document.querySelector('.product-carousel') as HTMLElement;
    carousel.scrollLeft += event.deltaY; // Scroll horizontally based on vertical scroll direction
    event.preventDefault(); // Prevent default vertical scroll
  }
  //Banner section
  activeSlideIndex: number = 0;
  intervalId: any;
  
  ngOnDestroy() {
    this.clearAutoSlide();
  }



  clearAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  getTransform() {
    return `translateX(-${this.activeSlideIndex * 100}%)`;
  }
  categories = [
    {
      image: 'assets/cables.jpeg',
      title: 'Zayıf Akım Kablolar',
      link: '/shop/shop-list?category=Zayıf%20Akım%20Kabloları'
    },
    {
      image: 'assets/power-cables.jpeg',
      title: 'Enerji Kabloları',
      link: '/shop/shop-list?category=Enerji%20Kabloları'
    },
    {
      image: 'assets/lighting.jpeg',
      title: 'Aydınlatma',
      link: '/shop/shop-list?category=Aydınlatma'
    }
  ];
  
  breakpointsConfig = {
    768: { // Masaüstü
      slidesPerView: 3,
    },
    0: { // Mobil
      slidesPerView: 2,
      spaceBetween: 10, // Ürünler arası boşluk

    }
  };
  

  // Method to set the active slide when clicking a thumbnail
  setActiveSlide(index: number) {
    this.activeSlideIndex = index;
  }
  //<!-- Sizin İçin Seçtiklerimiz,Çok Satanlar,İndirimli Ürünler section -->
  activeTab: string = 'recommended';
  allProducts: IProduct[] = [];

displayFeaturedProducts() {
  this.featuredProducts = this.allProducts.filter(product => product.ad !== 'Kargo').slice(0, 10); // İlk 10 ürünü al
}

updateDisplayedProducts() {
  if (this.allProducts.length === 0) {
    return; // Ürünler henüz yüklenmediyse çık
  }

  const filteredProducts = this.allProducts.filter(product => product.ad !== 'Kargo');

  switch (this.activeTab) {
    case 'recommended':
      this.displayedProducts = filteredProducts.slice(0, 10); // İlk 10 ürünü al
      break;
    case 'bestSellers':
      this.displayedProducts = filteredProducts.slice(10, 20); // Çok satanlar listesi
      break;
    case 'discounted':
      // 20. üründen sonraki indirimli ürünleri filtrele ve ilk 10 tanesini al
      this.displayedProducts = filteredProducts
        .slice(20) // 20. üründen sonraki ürünleri al
        .filter(product => product.indirim > 0) // İndirimli ürünler
        .slice(0, 10); // İlk 10 tanesi
      break;
  }
}



 // Çeşitli Elektrik Ürünleri section 
  electricProducts = [
    { image: 'assets/led.jpeg', title: 'Şerit Led', link: '/shop/shop-list?category=Şerit%20Led' },
    { image: 'assets/switchgear.jpeg', title: 'Şalt Malzemeler', link: '/shop/shop-list?category=Şalt%20Malzemeler' },
    // Diğer ürünleri burada ekleyin
  ];

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.pageX - (event.target as HTMLElement).scrollLeft;
    this.scrollLeft = (event.target as HTMLElement).scrollLeft;
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    const x = event.pageX - (event.target as HTMLElement).offsetLeft;
    const walk = (x - this.startX) * 1; // Sürükleme hızını ayarlamak için çarpan (daha az veya fazla yapabilirsiniz)
    (event.target as HTMLElement).scrollLeft = this.scrollLeft - walk;
    event.preventDefault();
  }

  onMouseUp() {
    this.isDragging = false;
  }

  onMouseLeave() {
    this.isDragging = false;
  }

}

