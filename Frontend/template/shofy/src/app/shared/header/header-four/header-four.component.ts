import { Component, HostListener, Input } from '@angular/core';
import { CartService } from '@/shared/services/cart.service';
import { WishlistService } from '@/shared/services/wishlist.service';
import { UtilsService } from '@/shared/services/utils.service';
import { Router } from '@angular/router';
import { IProduct } from '@/types/product-type';
import { ProductService } from '@/shared/services/product.service';

@Component({
  selector: 'app-header-four',
  templateUrl: './header-four.component.html',
  styleUrls: ['./header-four.component.scss']
})
export class HeaderFourComponent {
  @Input() products: IProduct[] = []; // Ürünleri parent component'ten alır

  searchText: string = ''; // Arama metni
  filteredProducts: IProduct[] = []; // Filtrelenmiş ürünler
  showDropdown: boolean = false; // Dropdown açık mı kapalı mı

    constructor(
        public cartService: CartService,
        public wishlistService: WishlistService,
        public utilsService: UtilsService,
        public router: Router,
        private productService: ProductService
      ) {}
    
      sticky : boolean = false;
      @HostListener('window:scroll',['$event']) onscroll () {
        if(window.scrollY > 80){
          this.sticky = true
        }
        else{
          this.sticky = false
        }
      }


      ngOnInit(): void {
        this.productService.products.subscribe((data: IProduct[]) => {
          this.products = data; // Tüm ürünleri al
        });
      }
      
      handleSearchSubmit() {
        if (this.searchText) {
          // Arama sorgusu ile belirli bir sayfaya yönlendir
          this.router.navigate(['/pages/search'], { queryParams: { searchText: this.searchText } });
        }
      }
      filterDropdownProducts(): void {
        if (this.searchText.trim() === '') {
          this.filteredProducts = []; // Arama metni boşsa, dropdown'u temizle
        } else {
          const lowerSearch = this.searchText.toLowerCase();
          this.filteredProducts = this.products.filter(
            (product) =>
              product.ad.toLowerCase().includes(lowerSearch) || // Ürün adı eşleşiyorsa
              product.kategori.toLowerCase().includes(lowerSearch) // Kategori eşleşiyorsa
          );
        }
      }
      selectProduct(product: IProduct): void {
        this.searchText = product.ad; // Seçilen ürünün adını arama çubuğuna yaz
        this.showDropdown = false; // Dropdown'u kapat
        // Yönlendirme veya başka bir işlem yapılabilir
      }
      
      hideDropdown(): void {
        setTimeout(() => {
          this.showDropdown = false;
        }, 200); // Küçük bir gecikme eklenerek seçim yapılmasına izin verilir
      }
      
      
      
}
