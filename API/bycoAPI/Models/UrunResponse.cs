using Microsoft.EntityFrameworkCore;
using System.Numerics;

/*
export interface IProduct {
  id: string;
  sku: string;
  img: string;
  title: string;
  slug: string;
  unit: string;
  imageURLs: {
    color?: {
      name: string;
      clrCode: string;
    };
    img: string;
  }[];
  parent: string;
  children: string;
  price: number;
  discount: number;
  quantity: number;
  brand: {
    name: string;
  };
  category: {
    name: string;
  };
  status: string;
  reviews?: IReview[];
  productType: string;
  description: string;
  orderQuantity?: number;
  additionalInformation: {
    key: string;
    value: string;
  }[];
  featured?: boolean;
  sellCount: number;
  offerDate?:{
    startDate:string;
    endDate:string;
  }
  tags?: string[];
  videoId?:string;
  sizes?:string[];
}
*/

namespace bycoAPI.Models {
    [Keyless]
    public class UrunResponse {
        public int urun_id { get; set; }
        public string? sku { get; set; }
        public string? img { get; set; }
        public string? title { get; set; }
        public string? slug { get; set; }
        public string? unit { get; set; }
        public List<ImgUrlModel>? imageurls {get; set;}
        public string? parent {get; set;}
        public string? children {get; set;}
        public long price { get; set; }
        public double discount { get; set; }
        public long quantity { get; set; }
        public BrandModel? brand {get; set;}
        public CategoryModel? category {get;set;}
        public string? status {get;set;}
        public string? producttype {get;set;}
        public string? description { get; set; }
        public List<AdditionalInformationModel>? additionalinformation {get; set;}
    }
}
