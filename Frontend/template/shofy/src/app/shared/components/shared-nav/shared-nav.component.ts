  import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
    open: boolean;
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
    isMobile = false; // Mobil cihaz kontrolü

    categories: Category[] = [
      {
        name: 'Aydınlatma',
        subCategories: [],
        open: false,
      },
      {
        name: 'Anahtar Priz',
        subCategories: [],
        open: false,
      },
      {
        name: 'Enerji Kabloları',
        subCategories: [],
        open: false,
      },
      {
        name: 'Zayıf Akım Kabloları',
        subCategories: [],
        open: false,
      },
      {
        name: 'Şalt Malzemeler',
        subCategories: [],
        open: false,
      },
      {
        name: 'Elektrik Tesisat Ürünleri',
        subCategories: [],
        open: false,
      },
      {
        name: 'Grup Priz/Fiş',
        subCategories: [],
        open: false,
      },
      {
        name: 'Diafon/Güvenlik',
        subCategories: [],
        open: false,
      },
      {
        name: 'Ses/Görüntü',
        subCategories: [],
        open: false,
      },
      {
        name: 'Fan/Aspiratör',
        subCategories: [],
        open: false,
      },
      {
        name: 'Araç Şarj Cihazları',
        subCategories: [],
        open: false,
      }
    ];
    isSideMenuOpen = false;

    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;
      const body = document.body;
      if (this.isSideMenuOpen) {
        body.style.overflow = 'hidden'; // Kaydırmayı devre dışı bırak
        body.style.position = 'fixed'; // Sayfayı sabitle
        body.style.width = '100%'; // Görünümü koru
      } else {
        body.style.overflow = ''; // Kaydırmayı etkinleştir
        body.style.position = ''; // Sabitlemeyi kaldır
        body.style.width = ''; // Görünümü sıfırla
      }
    }
    
  
    toggleSubcategories(category: Category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = null; // Kategori kapat
        category.open = false; // Alt kategorileri kapat
      } else {
        if (this.selectedCategory) {
          this.selectedCategory.open = false; // Önceki seçili kategoriyi kapat
        }
        this.selectedCategory = category; // Yeni kategoriyi seç
        category.open = true; // Yeni kategoriyi aç
      }
    }
    
    constructor(
      private route: ActivatedRoute,
      private router: Router
    ) {}

    ngOnInit() {
      this.fetchCategories();
      this.handleInitialPosition();
      this.checkIfMobile();
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
   
    @HostListener('window:resize')
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768; // Mobil cihaz genişliği
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
      return fetch(`https://bycobackend.online:5001/api/${url}`, {
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
