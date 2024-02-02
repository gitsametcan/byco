using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace bycoAPI.Models
{
    [Keyless]
    public class MusteriBilgi
    {
        public string? id { get; set; }
        public string? ad { get; set; }
        public string? tip { get; set; }
        public string? tutar { get; set; }
        public string? indirim { get; set; }
    }
}
