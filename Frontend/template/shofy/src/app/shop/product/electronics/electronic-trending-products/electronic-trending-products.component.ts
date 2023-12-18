import { Component, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-electronic-trending-products',
  templateUrl: './electronic-trending-products.component.html',
  styleUrls: ['./electronic-trending-products.component.scss']
})
export class ElectronicTrendingProductsComponent {
  // electronic prd
  public electronic_prd:IProduct[] = [];

  constructor(private cdr: ChangeDetectorRef,public productService: ProductService) {
    this.productService.products.subscribe((products) => {
      this.electronic_prd = products.filter((p) => p.productType === 'electronics');
      this.filteredProducts = this.getFilteredProducts();
    });
  }
  // tab
  public activeTab = 'New';
  public tabs = ['New', 'Featured', 'Top Sellers'];
  // handleActiveTab
  handleActiveTab(tab: string): void {
    this.activeTab = tab;
    this.filteredProducts = this.getFilteredProducts(); // Update the filtered products
    this.cdr.detectChanges(); // Trigger change detection
  }
  // filtered Products
  filteredProducts = this.getFilteredProducts(); // Initialize with default filtering
  // get Filtered Products
  getFilteredProducts(): IProduct[] {
    if (this.activeTab === 'New') {
      return this.electronic_prd.slice(0, 8);
    } else if (this.activeTab === 'Featured') {
      return this.electronic_prd.filter((product) => product.featured);
    } else if (this.activeTab === 'Top Sellers') {
      return this.electronic_prd
        .slice()
        .sort((a, b) => (b.sellCount ?? 0) - (a.sellCount ?? 0))
        .slice(0, 8);
    } else {
      return [];
    }
  }
}
