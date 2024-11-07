  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { ActivatedRoute, Router, Params } from '@angular/router';

  interface ThirdLevelCategory {
    name: string;
  }

  interface SubCategory {
    name: string;
    thirdLevels: ThirdLevelCategory[];
  }

  interface Category {
    name: string;
    subCategories: SubCategory[];
  }

  @Component({
    selector: 'app-shared-nav',
    templateUrl: './shared-nav.component.html',
    styleUrls: ['./shared-nav.component.scss']
  })
  export class SharedNavComponent implements OnInit, OnDestroy {
    isSubMenuVisible = false;
    selectedCategory: Category | null = null;
    hideTimeout: any;

    categories: Category[] = [
      {
        name: 'Aydınlatma',
        subCategories: []
      },
      {
        name: 'Anahtar Priz',
        subCategories: []
      },
      {
        name: 'Enerji Kabloları',
        subCategories: []
      },
      {
        name: 'Zayıf Akım Kabloları',
        subCategories: []
      },
      {
        name: 'Şalt Malzemeler',
        subCategories: []
      },
      {
        name: 'Elektrik Tesisat Ürünleri',
        subCategories: []
      },
      {
        name: 'Grup Priz/Fiş',
        subCategories: []
      },
      {
        name: 'Diafon/Güvenlik',
        subCategories: []
      },
      {
        name: 'Ses/Görüntü',
        subCategories: []
      },
      {
        name: 'Fan/Aspiratör',
        subCategories: []
      }
    ];

    constructor(
      private route: ActivatedRoute,
      private router: Router
    ) {}

    ngOnInit() {
      this.fetchCategories();
      this.handleInitialPosition();
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    ngOnDestroy() {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleInitialPosition() {
      const subCategoryContainer = document.querySelector('.sub-category-container');
      if (subCategoryContainer) {
        if (window.scrollY > 100) {
          subCategoryContainer.setAttribute('style', 'top: 110px !important;');
        } else {
          subCategoryContainer.setAttribute('style', 'top: 170px !important;');
        }
      }
    }

    handleScroll() {
      const subCategoryContainer = document.querySelector('.sub-category-container');
      if (subCategoryContainer) {
        if (window.scrollY > 100) {
          subCategoryContainer.setAttribute('style', 'top: 110px !important;');
        } else {
          subCategoryContainer.setAttribute('style', 'top: 170px !important;');
        }
      }
    }

    fetchCategories() {
      this.sendLocalRequest('Kategori/GetAll', 'GET')
        .then((response: any) => {
          // Backend'den gelen yapıyı organize et
          this.organizeCategories(response);
        })
        .catch(err => {
          console.error("Error fetching categories: ", err);
        });
    }

    organizeCategories(backendCategories: any[]) {
      backendCategories.forEach(category => {
        if (category.urunturu && category.ad) { // Add this check
          const mainCategory = this.categories.find(cat => cat.name === category.urunturu);
          if (mainCategory) {
            let subCategory = mainCategory.subCategories?.find(subCat => subCat.name === category.ad);
            
            if (!subCategory) {
              subCategory = { name: category.ad, thirdLevels: [] };
              mainCategory.subCategories = mainCategory.subCategories || [];
              mainCategory.subCategories.push(subCategory);
            }
          }
        }
      });
    }
    
    showSubMenu(category: Category) {
      clearTimeout(this.hideTimeout);
      this.isSubMenuVisible = true;
      this.selectedCategory = category;
    }

    hideSubMenu() {
      this.hideTimeout = setTimeout(() => {
        this.isSubMenuVisible = false;
        this.selectedCategory = null;
      }, 100);
    }

    navigateWithCategory(categoryName: string) {
      const queryParams: Params = { category: categoryName };
    
      this.router.navigate(['/shop/shop-list'], {
        queryParams,
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      });
    }
    
    
    sendLocalRequest(url: string, method: string, data?: any): Promise<any> {
      return fetch(`https://localhost:7096/api/${url}`, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data ? JSON.stringify(data) : undefined,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      });
    }
  }
