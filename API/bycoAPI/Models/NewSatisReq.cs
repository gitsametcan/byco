using System.Numerics;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models {
    [Keyless]
    public class NewSatisReq {
        public int satis_id { get; set; }
        public int user_id { get; set; }
        public int urun_id { get; set; }
        public int adet { get; set; }
    }
}
