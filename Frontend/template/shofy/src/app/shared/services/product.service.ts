import { IProduct } from '@/types/product-type';
import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import  product_data from '@/data/product-data';
import { map } from 'rxjs/operators';
import { URL } from './url';

const all_products = product_data

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    //benimUrl = this.urlhost.geturl();
    public urunler: IProduct[] = [];
  public filter_offcanvas: boolean = false;

  // Get Products
  public get products(): Observable<IProduct[]> {
    return of(this.GetAllProjects());
  }

  constructor() { }

  activeImg: string | undefined;

  handleImageActive(img: string) {
    this.activeImg = img;
  }

  // Get Products By id
  public getProductById(id: string): Observable<IProduct | undefined> {
    return this.products.pipe(map(items => {
      const product = items.find(p => p.id === id);
      if(product){
        this.handleImageActive(product.img)
      }
      return product;
    }));
  }
   // Get related Products
   public getRelatedProducts(productId: string,category:string): Observable<IProduct[]> {
    return this.products.pipe(map(items => {
      return items.filter(
        (p) =>
          p.category.name.toLowerCase() === category.toLowerCase() &&
          p.id !== productId
      )
    }));
  }
  // Get max price
  public get maxPrice(): number {
    const max_price = all_products.reduce((max, product) => {
      return product.price > max ? product.price : max;
    }, 0);
    return 250;
  }
// shop filterSelect
  public filterSelect = [
    { value: 'asc', text: 'Varsayılan Sıralama' },
    { value: 'low', text: 'Önce düşük fiyatlı' },
    { value: 'high', text: 'Önce yüksek fiyatlı' },
    { value: 'on-sale', text: 'İndirimde' },
  ];

    // Get Product Filter
    public filterProducts(filter: any= []): Observable<IProduct[]> {
      return this.products.pipe(map(product =>
        product.filter((item: IProduct) => {
          if (!filter.length) return true
          const Tags = filter.some((prev: any) => {
            if (item.tags) {
              if (item.tags.includes(prev)) {
                return prev;
              }
            }
          });
          return Tags
        })
      ));
    }


      // Sorting Filter
  public sortProducts(products: IProduct[], payload: string): any {

    if(payload === 'asc') {
      return products.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'on-sale') {
      return products.filter((p) => p.discount > 0)
    } else if (payload === 'low') {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'high') {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        }
        return 0;
      })
    }
  }

  /*
    ---------------------------------------------
    ------------- Product Pagination  -----------
    ---------------------------------------------
  */
  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 9) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if(currentPage < paginateRange - 1){
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage =  currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  GetAllProjects():IProduct[]{

    this.sendRequest('Urun/GetAllResponse','GET')
    .then(response => {
        this.urunler = response;
    })
    .catch(err => {
      console.error("Error: " + err);
    })

    return this.urunler;
  }

  public getAllProjects(): Observable<IProduct[]> {
    // If data is already fetched, return it as Observable.
    if (this.urunler.length > 0) {
      return of(this.urunler);
    } else {
      // Otherwise, fetch data and store it in urunler array.
      return from(this.sendRequest('Urun/GetAllResponse', 'GET')).pipe(
        map((response: IProduct[]) => {
          this.urunler = response; // Cache the response
          return response;
        })
      );
    }
  }


  sendRequest(url: string, method: string, data?:any): Promise<any> {

    return fetch(`https://bycobackend.online:5001/api/${url}`, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
      return response.json();
  })
  }
}
// Removed incorrect from function definition

