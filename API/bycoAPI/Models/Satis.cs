using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace bycoAPI.Models
{
    
    public class Satis
    {
        [Key]
        public int satis_id { get; set; }
        public int user_id { get; set; }
        public int urun_id { get; set; }
        public DateTime tarih { get; set; }
        public int adet { get; set; }
        public long fiyat { get; set; }
    }
}
