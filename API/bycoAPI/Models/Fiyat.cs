using System.Numerics;

namespace bycoAPI.Models
{
    public class Fiyat
    {
        public int fiyat_id {  get; set; }
        public int urun_id { get; set; }
        public string ozellik { get; set; }
        public BigInteger fiyat { get; set; }// veritabaninda eksik
    }
}
