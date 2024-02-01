import { ICategory } from "@/types/category-type";

const category_data:ICategory[] = [
  {
    id: "1",
    parent: "Diğer Kablolar",
    productType: "electronics",
    products: [],
    status: "Show"
  },
  {
    id: "2",
    parent: "Koaksiyel Kablolar",
    productType: "electronics",
    products: [
      "1",
      "2",
      "3",
      "4"
    ],
    status: "Show"
  },
  {
    id: "3",
    parent: "Yangina Dayanikli Kablolar",
    productType: "electronics",
    products: [
      "5",
      "6",
      "7",
      "8"
    ],
    status: "Show"
  },
  {
    id: "4",
    parent: "Dahili Telefon Kablolari",
    productType: "electronics",
    products: [
      "9",
      "10",
      "11",
      "12"
    ],
    status: "Show"
  }
]

export default category_data;
