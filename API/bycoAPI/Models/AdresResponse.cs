using System.Numerics;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    [Keyless]
    public class AdresResponse
    {
        public User? kullanıcı { get; set; }
        public List<string>? adresler;
    }
}
