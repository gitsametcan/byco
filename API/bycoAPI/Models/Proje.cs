using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    [Keyless]
    public class Proje
    {
        
        public int proje_id { get; set; }
        public string ad { get; set; }
        public string lokasyon { get; set; }
        public string tamamlanma { get; set; }
        public string alan { get; set; }
        public string isveren { get; set; }
        public string aciklama { get; set; }
        public string img { get; set; }
    }
}
