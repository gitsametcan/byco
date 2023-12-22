using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AdresController : ControllerBase {
        readonly IAdresService userService;

        public AdresController(IAdresService userService) {
            this.userService = userService;
        }

        [HttpGet("GetAdresById/{id}")]
        public async Task<ActionResult<Adresler>> GetFiyatById(int id) {
            var result = await userService.GetAdreslerByIdAsync(id);

            return result;
        }
    }
}
