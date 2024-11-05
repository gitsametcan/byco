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
        this.filterSubCategories(); // Filter subcategories after categories are fetched
      })
      .catch(err => console.error('Error fetching categories:', err));
  }

  filterSubCategories(): void {
    // Filter subcategories based on the selected main category in `urunturu`
    this.filteredSubCategories = this.categoryData.filter(
      (category) =>
        category.urunturu.toLowerCase().replace('&', '').split(' ').join('-') ===
        this.activeQuery
    );
  }

  handleCategoryRoute(value: string): void {
    const newCategory = value.toLowerCase().replace('&', '').split(' ').join('-');
    
    // Define the query parameters as an object
    const queryParams: Params = {
      category: newCategory,
    };
  
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams, // Pass the queryParams object here
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.activeQuery = newCategory; // Update activeQuery with the new selected category
        this.filterSubCategories(); // Filter the subcategories based on the new selection
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products'); // Scroll to products section
      });
  }
}
