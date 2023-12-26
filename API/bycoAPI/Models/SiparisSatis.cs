using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    [Keyless]
    public class SiparisSatis
    {
        public int siparissatis_id {get; set;}
        public int siparis_id {get; set;}
        public int satis_id {get; set;}
    }
}
