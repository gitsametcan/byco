using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace bycoAPI.Models
{
    [Keyless]
    public class Satis
    {
        public int satis_id { get; set; }
        public int user_id { get; set; }
        public int urun_id { get; set; }
        public DateTime tarih { get; set; }
        public int adet { get; set; }
        public long fiyat { get; set; }
    }
}
