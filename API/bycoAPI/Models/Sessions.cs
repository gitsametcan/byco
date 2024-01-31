using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    public class Sessions
    {
        [Key]
        public int session_id {  get; set; }
        public int user_id { get; set; }
        public string? session_key { get; set; }
        public DateTime expiration_date { get; set;}
    }
}
