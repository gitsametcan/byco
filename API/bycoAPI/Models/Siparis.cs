using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace bycoAPI.Models
{
    
    public class Siparis
    {
        [Key]
        public int siparis_id {get; set;}
        public string? adres { get; set; }
        public int user_id { get; set; }
        public string? siparis_kimlik { get; set;}
        public DateTime tarih { get; set; }
        public string? durum {get;set;}
    }
}
