using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models {
    [Keyless]
    public class Checkout {
        public List<List<string>>? satilan_urunler {get; set;}
        public string? session_key {get; set;}
    }
}
