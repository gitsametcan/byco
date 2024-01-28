using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    [Keyless]
    public class VergiNums
    {
        public int vergi_id {  get; set; }
        public int user_id { get; set; }
        public string? vergi_no { get; set; }
    }
}
