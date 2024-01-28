using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    [Keyless]
    public class Sessions
    {
        public int session_id {  get; set; }
        public int user_id { get; set; }
        public string? session_key { get; set; }
        public DateTime expiration_date { get; set;}
    }
}
