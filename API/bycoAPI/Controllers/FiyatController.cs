using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiyatController : ControllerBase
    {
        readonly IFiyatService userService;

        public FiyatController(IFiyatService userService)
        {
            this.userService = userService;
        }

        [HttpGet("GetFiyatById/{id}")]
        public async Task<ActionResult<Fiyat>> GetFiyatById(int id)
        {
            var result = await userService.GetFiyatByIdAsync(id);

            return result;
        }
    }
}
