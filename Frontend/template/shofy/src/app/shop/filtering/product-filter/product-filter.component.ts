import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})


export class ProductFilterComponent implements OnInit {
  public filterOptions: { [key: string]: string[] } = {};
  public selectedFilters: { [key: string]: string[] } = {};
  public filteredOptions: { [key: string]: string[] } = {};
  public isFilterOpen: { [key: string]: boolean } = {};

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFilterOptions();
  }

  private async loadFilterOptions() {
    this.filterOptions = await this.productService.getFilterOptions();
    // İlk yüklemede tüm filtreler kapalı ve filtrelenmemiş seçeneklerle dolu.
    Object.keys(this.filterOptions).forEach((key) => {
      this.isFilterOpen[key] = false;
      this.filteredOptions[key] = [...this.filterOptions[key]];
    });
  }


  onFilterChange(filterKey: string, option: string) {
    if (!this.selectedFilters[filterKey]) {
      this.selectedFilters[filterKey] = [];
    }

    const index = this.selectedFilters[filterKey].indexOf(option);
    if (index === -1) {
      this.selectedFilters[filterKey].push(option);
    } else {
      this.selectedFilters[filterKey].splice(index, 1);
    }

    this.applyFilters();
  }

  @Output() filterApplied = new EventEmitter<{ [key: string]: string[] }>();

  applyFilters() {
      this.filterApplied.emit(this.selectedFilters);
  }

  onSearch(event: any, filterKey: string) {
    const query = event.target.value.toLowerCase();
    this.filteredOptions[filterKey] = this.filterOptions[filterKey].filter((option) =>
      option.toLowerCase().includes(query)
    );
  }

  getOptionCount(filterKey: string, option: string): number {
    return this.productService.getOptionCount(filterKey, option);
}

toggleFilter(key: string) {
    this.isFilterOpen[key] = !this.isFilterOpen[key];
}

}
