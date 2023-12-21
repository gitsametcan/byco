using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SatisController : ControllerBase
    {
        readonly ISatisService userService;

        public SatisController(ISatisService userService)
        {
            this.userService = userService;
        }

        [HttpGet("GetSatisById/{id}")]
        public async Task<ActionResult<Satis>> GetSatisById(int id)
        {
            var result = await userService.GetSatisByIdAsync(id);

            return result;
        }
    }
}
