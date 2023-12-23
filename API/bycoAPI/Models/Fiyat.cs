using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace bycoAPI.Models {
    [Keyless]
    public class Fiyat {
        public int fiyat_id {  get; set; }
        public int urun_id { get; set; }
        public string ozellik { get; set; }
        public long fiyat { get; set; }// veritabaninda eksik
    }
}
