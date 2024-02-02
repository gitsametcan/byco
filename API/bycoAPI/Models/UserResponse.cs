using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace bycoAPI.Models
{
    [Keyless]
    public class UserResponse
    {
        public string? user_id { get; set; }
        public string? adsoyad { get; set; }
        public string? email { get; set; }
        public string? vkno { get; set; }
        public string? tip { get; set; }
        public string? telefon { get; set; }
        public string? adres { get; set; }
        public string? discount { get; set; }
    }
}
