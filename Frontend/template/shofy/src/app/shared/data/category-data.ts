import { ICategory } from "@/types/category-type";
import { HttpClient } from '@angular/common/http';


class CategoryService {
    benimUrl = "https://localhost:44313/api";

    kategori: ICategory[] = [];
    okey = false;
  
    constructor() {}

    result():ICategory[]{
        return this.kategori;
        

    }

    getKategoriler(){
        this.sendRequest('Kategori/GetAll','GET')
        .then(response => {
            this.kategori = response;
            this.okey=true;
        })
        .catch(err => {
          console.error("Error: " + err);
        })
        this.okey=false;
      }

    private sendRequest(url: string, method: string, data?:any): Promise<any> {
    
        return fetch(`${this.benimUrl}/${url}`, {
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

   const categoryService = new CategoryService();
   console.log("kategoriler  " + categoryService.getKategoriler() +"  deneme");

  const category_data:ICategory[] = new CategoryService().result()

  

// const category_data:ICategory[] = [
//   {
//     id: "1",
//     parent: "Diğer Kablolar",
//     productType: "electronics",
//     products: [],
//     status: "Show"
//   },
//   {
//     id: "2",
//     parent: "Koaksiyel Kablolar",
//     productType: "electronics",
//     products: [
//       "1",
//       "2",
//       "3",
//       "4"
//     ],
//     status: "Show"
//   },
//   {
//     id: "3",
//     parent: "Yangina Dayanikli Kablolar",
//     productType: "electronics",
//     products: [
//       "5",
//       "6",
//       "7",
//       "8"
//     ],
//     status: "Show"
//   },
//   {
//     id: "4",
//     parent: "Dahili Telefon Kablolari",
//     productType: "electronics",
//     products: [
//       "9",
//       "10",
//       "11",
//       "12"
//     ],
//     status: "Show"
//   }
// ]
console.log("listeden" + category_data);
export default category_data;

