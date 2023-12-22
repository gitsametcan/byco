using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdresController : ControllerBase {
        readonly IAdresService userService;

        public AdresController(IAdresService userService) {
            this.userService = userService;
        }

        [HttpGet("GetAdresById/{id}")]
        public ActionResult<IEnumerable<Adresler>> GetFiyatById(int id) {
            List<Adresler> result = userService.GetUserAdresses(id);
            return result;
        }

        [HttpPost("PostAdress/{id}")]
        public async Task<ActionResult<Proje>> PostAdress(Adresler adres)
        {
            //first.Id = Empty;

            return CreatedAtAction("Kayit", userService.ProjeKaydet(proje).Data);
        }

    }
}
