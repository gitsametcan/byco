import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-shop-area',
  templateUrl: './shop-area.component.html',
  styleUrls: ['./shop-area.component.scss']
})
export class ShopAreaComponent {
  @Input() listStyle: boolean = false;
  @Input() full_width: boolean = false;
  @Input() shop_1600: boolean = false;
  @Input() shop_right_side: boolean = false;
  @Input() shop_no_side: boolean = false;

  public products: IProduct[] = [];
  public minPrice: number = 0;
  public niceSelectOptions = this.productService.filterSelect;
  public brands: string[] = [];
  public tags: string[] = [];
  public category: string | null = null;
  public subcategory: string | null = null;
  public status: string | null = null;
  public brand: string | null = null;
  public pageNo: number = 1;
  public pageSize: number = 12;
  public paginate: any = {}; // Pagination use only
  public sortBy: string = 'asc'; // Sorting Order
  public mobileSidebar: boolean = false;
  public filteredProducts: IProduct[] = [];


  activeTab: string = this.listStyle ? 'list' : 'grid';
  handleActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // shop changeFilterSelect
  changeFilterSelect(selectedOption: { value: string, text: string }) {
    this.sortByFilter(selectedOption.value)
  }
  
  onFilterApplied(selectedFilters: { [key: string]: string[] }): void {
    // Call ProductService's filtering function to get products based on selected filters
    this.filteredProducts = this.productService.filterProductsByFeature(selectedFilters);
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private viewScroller: ViewportScroller
  ) {
    // Get Query params..
    this.route.queryParams.subscribe((params) => {
      // console.log('params', params);
      this.minPrice = params['minPrice'] ? params['minPrice'] : this.minPrice;
      this.brand = params['brand']
        ? params['brand'].toLowerCase().split(' ').join('-') : null;

      this.category = params['category']
        ? params['category'].toLowerCase().split(' ').join('-') : null;
      this.subcategory = params['subcategory']
        ? params['subcategory'].toLowerCase().split(' ').join('-') : null;
      this.status = params['status']
        ? params['status'].toLowerCase().split(' ').join('-') : null;
      this.pageNo = params['page'] ? params['page'] : this.pageNo;
      this.sortBy = params['sortBy'] ? params['sortBy'] : 'asc';

      //console.log('products', this.productService.urunler);

      // Get Filtered Products..
      this.productService.filterProducts().subscribe((response) => {
        // Sorting Filter
        this.products = this.productService.sortProducts(response, this.sortBy);
        // Category Filter
        if (this.category) {
            this.products = this.products.filter(
              (p) => (p.parent?.toLowerCase() ?? '').split(' ').join('-') === this.category
            );
          }
          
          if (this.subcategory) {
            this.products = this.products.filter(
              (p) => (p.children?.toLowerCase() ?? '').replace("&", "").split(" ").join("-") === this.subcategory
            );
          }
        // status Filter
        if (this.status) {
          if (this.status === 'i̇ndirimde') {
            this.products = this.products.filter((p) => p.indirim > 0);
          } else if (this.status === 'stokta') {
            this.products = this.products.filter((p) => p.durum === 'stokta');
          }
          else if (this.status === 'tükendi') {
            this.products = this.products.filter((p) => p.durum === 'tükendi' || p.stok === 0);
          }
        }
        // brand filtering
        if (this.brand) {
          this.products = this.products.filter((p) => p.marka.toLowerCase() === this.brand);
        }

        // Price Filter
        
        // Paginate Products
        this.paginate = this.productService.getPager(this.products.length,Number(+this.pageNo),this.pageSize);
        this.products = this.products.slice(this.paginate.startIndex,this.paginate.endIndex + 1);
      });
    });
  }
  ngOnInit() {
    this.activeTab = this.listStyle ? 'list' : 'grid';
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      if (this.category) {
        this.fetchProductsByCategory(this.category);
      }
    });
    this.filteredProducts = [...this.products]; // Default to all products initially

  }
  fetchProductsByCategory(category: string) {
    console.log("Gönderilen Kategori:", category);  // Kontrol için kategori yazdır
  
    this.productService.getProductsByCategory(category).then(
      (response: IProduct[]) => {
        this.products = response;
        console.log('API Yanıtı:', response);  // Yanıtı konsolda göster
        if (this.products.length === 0) {
          console.warn("API'den ürün gelmedi.");
        }
      },
      error => {
        console.error('Ürünler çekilirken hata oluştu:', error);
      }
    );
  }
  
  
  
  
  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
  }

  // SortBy Filter
  sortByFilter(value:string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null},
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  handleResetFilter () {
    this.minPrice = 0;
    this.pageNo = 1;
    this.router.navigate(['shop']);
  }
}
