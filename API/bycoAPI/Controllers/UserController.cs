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
        readonly ITokenService tokenService;

        public UserController(IUserServices userService, ITokenService tokenService)
        {
            this.userService = userService;
            this.tokenService = tokenService;
        }

        [HttpGet("GetUser")]
        public async Task<User> GetUser()
        {
            string token = Request.Headers["Authorization"];

            token = token.Substring(7);
            string email = await tokenService.decodeKey(token);
            User user = await userService.GetUserByEmail(email);
            return await userService.GetUserAsync(user.user_id);
        }

        [AllowAnonymous]
        [HttpPost("RegisterUser")]
        public async Task<RequestResponse> RegisterUser([FromBody] User user)
        {
            return await userService.UserKaydet(user);
        }

        [HttpGet("GetAll")]
        [AllowAnonymous]
        public async Task<List<User>> GetAll() {
            return await userService.GetUserInfoForAdmin();
        }

    }
}
