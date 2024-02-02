using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace bycoAPI.Models
{
    
    public class User
    {
        [Key]
        public int user_id { get; set; }
        public string? ad { get; set; }
        public string? soyad { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        public string? telefon { get; set; }
        public int tip { get; set; }
    }
}
