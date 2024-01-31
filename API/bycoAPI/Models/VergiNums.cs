using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    public class VergiNums
    {
        [Key]
        public int vergi_id {  get; set; }
        public int user_id { get; set; }
        public string? vergi_no { get; set; }
    }
}
