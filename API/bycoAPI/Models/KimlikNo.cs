using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    public class KimlikNo
    {
        [Key]
        public int kimlik_id {  get; set; }
        public int user_id { get; set; }
        public string? kimlik_no { get; set; }
    }
}
