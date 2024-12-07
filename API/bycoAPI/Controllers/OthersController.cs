using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Utils;

namespace bycoAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OthersController : ControllerBase {
        readonly IUserServices _userService;
        readonly ITokenService _tokenService;

        public OthersController(ICategoryService service, IUserServices userServices,ITokenService tokenService) {
            _userService = userServices;
            _tokenService = tokenService;
        }
        
        // [AllowAnonymous]
        // [HttpGet("Get")]


        
        // [HttpPut("Change")]
        

    }
}
