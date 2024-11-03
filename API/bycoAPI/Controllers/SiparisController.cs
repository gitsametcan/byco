using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using bycoAPI.Models;
using bycoAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SiparisController : ControllerBase
    {
        

        [HttpGet("SplitTry/{deneme}")]
        public async Task<List<int>> LoginUserAsync(string deneme)
        {
            List<int> sayilar = [];

            var urunAdetCiftleri = deneme.Split('-', StringSplitOptions.RemoveEmptyEntries);

            foreach (var cift in urunAdetCiftleri)
                {
                    var parts = cift.Split('x');
                    if (parts.Length == 2
                        && int.TryParse(parts[0], out int urunId)
                        && int.TryParse(parts[1], out int adet))
                    {
                        // 2. Ürün ID'sine göre veritabanından ürünü getir
                        sayilar.Add(urunId);
                        sayilar.Add(adet);
                    }
                }

            return sayilar;
        }
    }
}
