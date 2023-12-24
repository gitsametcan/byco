using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace bycoAPI.Models {
    [Keyless]
    public class ImgUrlModel {
        public string img { get; set; }
        
        public ColorModel color {get; set;}
    }
}
