using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OzellikController : ControllerBase
    {
        readonly IOzellikService userService;

        public OzellikController(IOzellikService userService)
        {
            this.userService = userService;
        }

        [HttpGet("GetOzellikById/{id}")]
        public async Task<ActionResult<Ozellik>> GetOzellikById(int id)
        {
            var result = await userService.GetOzellikByIdAsync(id);

            return result;
        }
    }
}
