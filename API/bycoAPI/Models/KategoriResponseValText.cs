using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    [Keyless]
    public class KategoriResponseValText
    {
        public string? value {  get; set; }
        public string? text { get; set; }
    }
}
