using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace bycoAPI.Models
{
    
    public class SiparisSatis
    {
        [Key]
        public int siparissatis_id {get; set;}
        public int siparis_id {get; set;}
        public int satis_id {get; set;}
    }
}
