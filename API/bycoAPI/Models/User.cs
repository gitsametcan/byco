using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    [Keyless]
    public class User
    {
        public int user_id { get; set; }
        public string? ad { get; set; }
        public string? soyad { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        public int tip { get; set; }
    }
}
