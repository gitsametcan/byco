using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    [Keyless]
    public class KimlikNo
    {
        public int kimlik_id {  get; set; }
        public int user_id { get; set; }
        public string? kimlik_no { get; set; }
    }
}
