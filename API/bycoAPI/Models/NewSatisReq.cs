using System.Numerics;

namespace bycoAPI.Models {
    public class NewSatisReq {
        public int satis_id { get; set; }
        public int user_id { get; set; }
        public int fiyat_id { get; set; }
        public int adet { get; set; }
    }
}
