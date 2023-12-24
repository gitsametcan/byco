using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace bycoAPI.Models {
    [Keyless]
    public class Checkout {
        public string? isim { get; set; }
        public string? soyisim { get; set; }
        public string? sirket_adi { get; set; }
        public string? ulke { get; set; }
        public string? adres_satiri_1 { get; set; }
        public string? adres_satiri_2 { get; set; }
        public string? il_ilce { get; set; }
        public string? kita { get; set; }
        public string? posta_kodu { get; set; }
        public string? telefon { get; set; }
        public string? email { get; set; }
        public string? siparis_notu { get; set; }

        public List<NewSatisReq>? satilan_urunler {get; set;}
    }
}
