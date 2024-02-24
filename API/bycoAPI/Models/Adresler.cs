using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace bycoAPI.Models
{
    
    public class Adresler
    {
        [Key] public int adres_id {  get; set; }
        public int user_id { get; set; }
        public string? adres { get; set; }
    }
}
