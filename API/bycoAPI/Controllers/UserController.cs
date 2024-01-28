using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Utils;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase {
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

        [AllowAnonymous]
        [HttpPost("LogIn")]
        public async Task<ActionResult<User>> LogIn(User user)
        {
            return CreatedAtAction("Kayit", userService.UserKaydet(user).Data);
        }

        [AllowAnonymous]
        [HttpPost("RegisterUser")]
        public async Task<ActionResult<User>> RegisterUser(User user)
        {
            return CreatedAtAction("Kayit", userService.UserKaydet(user).Data);
        }

        [AllowAnonymous]
        [HttpPost("PostUser")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            return CreatedAtAction("Kayit", userService.UserKaydet(user).Data);
        }
    }
}
