namespace bycoAPI.Models
{
    public class Satis
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public int urun_id { get; set; }
        public DateTime tarih { get; set; }
        public int adet { get; set; }
        public double fiyat { get; set; }
    }
}
