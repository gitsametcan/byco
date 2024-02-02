using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace bycoAPI.Models
{
    [Keyless]
    public class SiparisBilgi
    {
        
        public string? siparis_id {get; set;}
        public string? musteri {get; set;}
        public string? urunadedi { get; set; }
        public string? tarih { get; set; }
        public string? durum {get;set;}
    }
}
