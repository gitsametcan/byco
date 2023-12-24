using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    [Keyless]
    public class Ozellik
    {
        public int ozellik_id {  get; set; }
        public int urun_id { get; set; }
        public string? ozellik { get; set; }
        public string? aciklama { get; set; }
    }
}
