using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrunController : ControllerBase
    {
        readonly IUrunService userService;

        public UrunController(IUrunService userService)
        {
            this.userService = userService;
        }

        [HttpGet("GetUrunById/{id}")]
        public async Task<ActionResult<Urun>> GetUrunById(int id)
        {
            var result = await userService.GetUrunByIdAsync(id);

            return result;
        }
    }
}
