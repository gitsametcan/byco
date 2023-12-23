using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        readonly IUserServices userService;

        public UserController(IUserServices userService)
        {
            this.userService = userService;
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var result = await userService.GetUserAsync(id);

            return result;
        }

        [HttpPost("PostUser")]
        public async Task<ActionResult<Proje>> PostFirstItem(User user)
        {
            return CreatedAtAction("Kayit", userService.UserKaydet(user).Data);
        }
    }
}
