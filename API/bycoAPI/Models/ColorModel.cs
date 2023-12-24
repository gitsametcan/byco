using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace bycoAPI.Models {
    [Keyless]
    public class ColorModel {
        public string name { get; set; }
        public string clrcode {get; set;}
    }
}
