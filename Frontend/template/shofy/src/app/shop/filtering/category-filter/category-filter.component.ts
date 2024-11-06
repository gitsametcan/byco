import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent implements OnInit {
  public categoryData: any[] = []; // Categories fetched from backend
  public filteredSubCategories: any[] = []; // Filtered subcategories based on selected main category
  activeQuery: string = '';
  isSubCategoryView: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchCategories(); // Fetch categories from backend
    this.route.queryParams.subscribe((queryParams) => {
      this.activeQuery = queryParams['category'];
      this.filterSubCategories(); // Filter subcategories based on selected main category
    });
  } 

  fetchCategories(): void {
    fetch('https://localhost:7096/api/Kategori/GetAll')
      .then(response => response.json())
      .then(data => {
        this.categoryData = data;
        console.log('Fetched Categories:', this.categoryData); // Kategori verisini konsola yazdır
        this.filterSubCategories(); // Filter subcategories after categories are fetched
      })
      .catch(err => console.error('Error fetching categories:', err));
  }
  

  async filterSubCategories(): Promise<void> {
    const filtered = this.categoryData.filter(
      (category) => category.urunturu === this.activeQuery
    );
  
    // Add product counts to each subcategory
    for (let subCategory of filtered) {
      const products = await this.productService.getProductsByCategory(subCategory.ad);
      subCategory.productCount = products.length;
    }
  
    this.filteredSubCategories = filtered;
  
    // Set `isSubCategoryView` to true only if there are filtered subcategories
    this.isSubCategoryView = this.filteredSubCategories.length > 0;
    console.log("Filtered Subcategories with Counts:", this.filteredSubCategories);
  }
  
  
  
  

  handleCategoryRoute(value: string): void {
    const originalCategory = value;
  
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { category: originalCategory },
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.activeQuery = originalCategory;
        this.isSubCategoryView = true; // Mark as subcategory view
  
        this.filterSubCategories();
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products');
      });
  }
  
  goBackToMainCategory(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: null },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    }).finally(() => {
      this.activeQuery = '';
      this.isSubCategoryView = false; // Ensure view resets to main category
      this.filterSubCategories();
    });
  }
  
  
  
  
}
