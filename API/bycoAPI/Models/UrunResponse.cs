using Microsoft.EntityFrameworkCore;
using System.Numerics;


namespace bycoAPI.Models {
    [Keyless]
    public class UrunResponse {
        public string id { get; set; }
        public string? sku { get; set; }
        public string? img { get; set; }
        public string? title { get; set; }
        public string? slug { get; set; }
        public string? unit { get; set; }
        public List<ImgUrlModel>? imageURLs {get; set;}
        public string? parent {get; set;}
        public string? children {get; set;}
        public decimal price { get; set; }
        public double discount { get; set; }
        public long quantity { get; set; }
        public BrandModel? brand {get; set;}
        public CategoryModel? category {get;set;}
        public string? status {get;set;}
        public string? productType {get;set;}
        public string? description { get; set; }
        public List<AdditionalInformationModel>? additionalInformation {get; set;}
        public long sellCount { get; set; }
    }
}
