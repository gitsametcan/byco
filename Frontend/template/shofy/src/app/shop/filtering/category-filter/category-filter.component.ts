import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent implements OnInit {
  public categoryData: any[] = []; // Kategoriler
  public filteredSubCategories: any[] = []; // Filtrelenmiş alt kategoriler
  activeQuery: string = '';
  isSubCategoryView: boolean = false;
  @Output() categorySelected = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchCategories(); // Kategorileri backend'den al
    this.route.queryParams.subscribe((queryParams) => {
      this.activeQuery = queryParams['category'];
      this.filterSubCategories(); // Seçilen ana kategoriye göre alt kategorileri filtrele
    });
  } 

  fetchCategories(): void {
    fetch('https://localhost:7096/api/Kategori/GetAll')
      .then(response => response.json())
      .then(data => {
        this.categoryData = data;
        this.filterSubCategories(); // Kategoriler geldikten sonra alt kategorileri filtrele
      })
      .catch(err => console.error('Error fetching categories:', err));
  }
  

  async filterSubCategories(): Promise<void> {
    if (this.categoryData.some(category => category.urunturu === this.activeQuery)) {
        // `urunturu` seviyesindeyiz, bu `urunturu`'ya ait tüm `ad`'ları göster
        this.filteredSubCategories = this.categoryData.filter(
            (category) => category.urunturu === this.activeQuery
        );

        // Alt kategorilere ürün sayısını ekle
        for (let subCategory of this.filteredSubCategories) {
            const products = await this.productService.getProductsByCategory(subCategory.ad);
            subCategory.productCount = products.length;
        }

        this.isSubCategoryView = false;
    } else {
        // `ad` seviyesindeyiz, alt kategoriler için `isSubCategoryView`'u `true` yap
        this.filteredSubCategories = this.categoryData.filter(
            (category) => category.ad === this.activeQuery
        );

        // `ad` seviyesindeki kategorinin ürün sayısını ekle
        for (let subCategory of this.filteredSubCategories) {
            const products = await this.productService.getProductsByCategory(subCategory.ad);
            subCategory.productCount = products.length;
        }

        this.isSubCategoryView = true;
    }
}


  

  handleCategoryRoute(value: string): void {
    this.categorySelected.emit(value); // Seçilen kategoriyi ilet

    this.isSubCategoryView = true; // Alt kategoriye girildiğini belirt
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category: value },
        queryParamsHandling: 'merge',
        skipLocationChange: false,
    }).finally(() => {
        this.activeQuery = value;
        this.filterSubCategories(); // Alt kategorileri filtrele
    });
  }

  goBackToMainCategory(): void {
    if (this.activeQuery) {
        // activeQuery'den urunturu seviyesini ayarla
        const mainCategory = this.categoryData.find(category => category.ad === this.activeQuery)?.urunturu;
        
        if (mainCategory) {
            this.activeQuery = mainCategory;
            this.isSubCategoryView = false;
            this.filterSubCategories(); // urunturu seviyesine uygun alt kategorileri göster

            // URL'de güncelleme yap
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: { category: mainCategory },
                queryParamsHandling: 'merge',
                skipLocationChange: false,
            });
        }
    }
}

}
