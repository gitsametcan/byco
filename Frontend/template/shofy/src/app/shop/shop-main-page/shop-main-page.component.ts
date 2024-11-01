import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  displayedProducts: IProduct[] = []; // Array to display up to 10 products
  activeProductIndex: number = 0; // Track the active product index
  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  
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
  


  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProjects().subscribe((data: IProduct[]) => {
      this.allProducts = data;
      this.updateDisplayedProducts();
    });
    this.startAutoSlide();

  }

  selectTab(tab: string) {
    this.activeTab = tab;
    this.updateDisplayedProducts();
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
  slides: Slide[] = [
    { image: 'assets/image1.jpg', title: 'Güç Kabloları', link: 'https://example.com/guc-kablolari' },
    { image: 'assets/image2.jpg', title: 'Nexans Kablo Stoklarda!', link: 'https://example.com/nexans-kablo' },
    { image: 'assets/image3.jpg', title: 'Zayıf Akım Kablo Çeşitleri', link: 'https://example.com/kablo-cesitleri' },
    // Add more slides as needed
  ];
  ngOnDestroy() {
    this.clearAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
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
      image: 'assets/zayif-akim-kablolar.jpg',
      title: 'Zayıf Akım Kablolar',
      link: '/kategori/zayif-akim'
    },
    {
      image: 'assets/enerji-kablolari.jpg',
      title: 'Enerji Kabloları',
      link: '/kategori/enerji'
    },
    {
      image: 'assets/ray-spotlar.jpg',
      title: 'Ray Spotlar',
      link: '/kategori/ray-spotlar'
    }
  ];
  
  // Method to navigate to the next slide
  nextSlide() {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.slides.length;
  }

  // Method to navigate to the previous slide
  previousSlide() {
    this.activeSlideIndex = (this.activeSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  // Method to set the active slide when clicking a thumbnail
  setActiveSlide(index: number) {
    this.activeSlideIndex = index;
  }
  //<!-- Sizin İçin Seçtiklerimiz,Çok Satanlar,İndirimli Ürünler section -->
  activeTab: string = 'recommended';
  allProducts: IProduct[] = [];



updateDisplayedProducts() {
  if (this.allProducts.length === 0) {
      return; // Ürünler henüz yüklenmediyse çık
  }
  switch (this.activeTab) {
    case 'recommended':
      this.displayedProducts = this.allProducts.slice(0, 10); // İlk 10 ürünü al
      break;
    case 'bestSellers':
      this.displayedProducts = this.allProducts.slice(10, 20); // Çok satanlar listesi
      break;
    case 'discounted':
      this.displayedProducts = this.allProducts.slice(20, 30); // İndirimli ürünler listesi
      break;
  }
}

 // Çeşitli Elektrik Ürünleri section 
  electricProducts = [
    { image: 'assets/serit-led.jpg', title: 'Şerit Led', link: '/urunler/serit-led' },
    { image: 'assets/salt-malzemeler.jpg', title: 'Şalt Malzemeler', link: '/urunler/salt-malzemeler' },
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

