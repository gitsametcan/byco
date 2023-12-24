using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    [Keyless]
    public class Urun
    {
        public int urun_id { get; set; }
        public int stok { get; set; }
        public string ad { get; set; }
        public string aciklama { get; set; }
        public int kategori_id { get; set; }
        public string img { get; set; }
        public int fiyat { get; set;}
    }
}
