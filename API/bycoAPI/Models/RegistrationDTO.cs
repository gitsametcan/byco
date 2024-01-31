using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    [Keyless]
    public class RegistrationDTO
    {
        public string? ad { get; set; }
        public string? soyad { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        public string tip { get; set; }
        public string vergi_no_kimlik_no { get; set; }
    }
}
