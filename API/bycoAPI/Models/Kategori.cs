using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace bycoAPI.Models {
    [Keyless]
    public class Kategori {
        public int kategori_id { get; set; }
        public int parent_id { get; set; }
        public string? ad { get; set; }
    }
}
