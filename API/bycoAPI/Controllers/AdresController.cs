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
        public async Task<ActionResult<List<Adresler>>> GetFiyatById(int id) {
            var result = await userService.GetUserAdresses(id);
            return Ok(result);
        }

        [HttpPost("PostAdress/{id}")]
        public async Task<ActionResult<Adresler>> PostAdress(Adresler adres)
        {
            //first.Id = Empty;

            return CreatedAtAction("Kayit", userService.AdresKaydet(adres).Data);
        }

        [HttpPost("SetAdres/{user_di}")]
        public async Task<ActionResult> SetAdres(int user_id, [FromBody] string adres) {
            var result = await userService.SetAdres(user_id, adres);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }

    }
}
