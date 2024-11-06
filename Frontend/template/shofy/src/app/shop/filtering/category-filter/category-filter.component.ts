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
    const originalCategory = value; // Orijinal kategori adını olduğu gibi kullan
  
    console.log("Yeni Seçilen Kategori (Orijinal Format):", originalCategory); // Kontrol amaçlı
  
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { category: originalCategory },
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.activeQuery = originalCategory; // Yeni kategoriyi güncelle
        this.filterSubCategories(); // Yeni seçime göre alt kategorileri filtrele
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products'); // Ürünler bölümüne kaydır
      });
  }
  
  
  
}
