using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using bycoAPI.Models;
using bycoAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {
        readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("LoginUser")]
        [AllowAnonymous]
        public async Task<ActionResult<LoginResp>> LoginUserAsync([FromBody] LoginReq request)
        {
            var result = await authService.LoginUserAsync(request);

            return result;
        }

        [HttpGet("TryConnection")]
        [AllowAnonymous]
        public async Task<ActionResult<LoginResp>> TryConnection()
        {
            
                LoginResp loginResp = new LoginResp();
                loginResp.AuthenticateResult = true;
                loginResp.AuthToken = "deneme";
                loginResp.AccessTokenExpireDate = DateTime.Now;
                return loginResp;
            
            
        }
    }
}
