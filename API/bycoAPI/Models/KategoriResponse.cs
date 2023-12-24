
/*
id: string;
  img?: string;
  parent: string;
  children?: string[];
  productType: string;
  products: string[];
  status: string;
*/

using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models {
  [Keyless]
    public class KategoriResponse {
        public string? id { get; set; }
        public string? parent { get; set; }
        public string? productType { get; set; }
        public List<string>? products { get; set; }
        public string? status { get; set; } 
    }
}
