using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using bycoAPI.Models;
using bycoAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using bycoAPI.Services;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SiparisController : ControllerBase
    {
        readonly ISiparisService _siparisService;

        readonly ITokenService _tokenService;
        readonly IUserServices _userService;

        public SiparisController(ISiparisService service, ITokenService tokenService,IUserServices userService)
        {
            _siparisService = service;
            _tokenService = tokenService;
            _userService = userService;
        }

        //public Task<RequestResponse> SiparisKargoda(int siparis_id);

        [HttpPost("SiparisKargoda/{kargono}")]
        [AllowAnonymous]
        public async Task<RequestResponse> SiparisKargoda([FromBody] string siparisno,string kargono)
        {

            // string token = Request.Headers["Authorization"];

            // token = token.Substring(7);
            // string email = await _tokenService.decodeKey(token);
            // User user = await _userService.GetUserByEmail(email);

            // if (user.tip == 0)
            // {
            //     return await _siparisService.SiparisKargoda(siparisno,kargono);
            // }
            // else return new RequestResponse{StatusCode=401,ReasonString="unauthorized"};
            return await _siparisService.SiparisKargoda(siparisno,kargono);
        }


        [HttpPost("SiparisOdemeTamam")]
        public async Task<RequestResponse> OdemeTamam([FromBody] string siparisno)
        {

            string token = Request.Headers["Authorization"];

            token = token.Substring(7);
            string email = await _tokenService.decodeKey(token);
            User user = await _userService.GetUserByEmail(email);

            if (user.tip == 0)
            {
                return await _siparisService.OdemeAlindi(siparisno);
            }
            else return new RequestResponse{StatusCode=401,ReasonString="unauthorized"};
        }


        [HttpGet("GetAll")]
        public async Task<List<SiparisOut>> GetSiparisForAdmin()
        {
            string token = Request.Headers["Authorization"];

            token = token.Substring(7);
            string email = await _tokenService.decodeKey(token);
            User user = await _userService.GetUserByEmail(email);

            if (user.tip == 0) return await _siparisService.GetSiparisForAdmin();
            else return await _siparisService.GetSiparisForLasts(email);
        }

        [HttpGet("GetSiparisByNo/{siparisno}")]
        //[AllowAnonymous]
        public async Task<SiparisOut> GetSiparisByNo(string siparisno)
        {
            var result = await _siparisService.GetSiparisBySiparisNo(siparisno);

            return result;
        }

        // [HttpGet("GetSiparisForUser")]
        // [AllowAnonymous]
        // public async Task<List<SiparisOut>> GetSiparisForUser()
        // {
        //     string token = Request.Headers["Authorization"];

        //     token = token.Substring(7);
        //     string email = await _tokenService.decodeKey(token);
        //     var result = await _siparisService.GetSiparisForLasts(email);

        //     return result;
        // }

        

        
    }
}
