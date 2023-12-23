using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace bycoAPI.Models
{
    [Keyless]
    public class Adresler
    {
        public int adres_id {  get; set; }
        public int user_id { get; set; }
        public string? adres { get; set; }
    }
}
