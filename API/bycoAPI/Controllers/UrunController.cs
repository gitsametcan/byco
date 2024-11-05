using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UrunController : ControllerBase
    {
        readonly IUrunService _service;
        readonly IUserServices _userService;
        readonly ITokenService _tokenService;

        public UrunController(IUrunService service, ITokenService tokenService, IUserServices userServices)
        {
            _service = service;
            _userService = userServices;
            _tokenService = tokenService;
        }

        [HttpGet("GetById/{id}")]
        [AllowAnonymous]
        public async Task<Product> GetUrunById(int id)
        {
            var result = await _service.GetUrunByIdAsync(id);

            return result;
        }

        [HttpGet("GetAll")]
        [AllowAnonymous]
        public async Task<List<Product>> GetAll()
        {
            var result = await _service.GetAllUrun();

            return result;
        }

        [HttpPost("Add")]
        public async Task<RequestResponse> AddUrun([FromBody] Product product)
        {

            string token = Request.Headers["Authorization"];

            token = token.Substring(7);
            string email = await _tokenService.decodeKey(token);
            User user = await _userService.GetUserByEmail(email);

            if (user.tip == 0)
            {
                return await _service.AddUrun(product);
            }
            else return new RequestResponse{StatusCode=401,ReasonString="unauthorized"};
        }

        [HttpPut("Update/{urun_id}")]
        public async Task<RequestResponse> UpdateUrun(int urun_id, [FromBody] Product body)
        {
            string token = Request.Headers["Authorization"];

            token = token.Substring(7);
            string email = await _tokenService.decodeKey(token);
            User user = await _userService.GetUserByEmail(email);

            if (user.tip == 0)
            {
                return await _service.UpdateUrun(urun_id, body);
            }
            else return new RequestResponse{StatusCode=401,ReasonString="unauthorized"};
        }

        [HttpDelete("Delete/{urun_id}")]
        public async Task<RequestResponse> DeleteUrun(int urun_id)
        {
            string token = Request.Headers["Authorization"];

            token = token.Substring(7);
            string email = await _tokenService.decodeKey(token);
            User user = await _userService.GetUserByEmail(email);

            if (user.tip == 0)
            {
                return await _service.DeleteUrun(urun_id);
                
            }
            else return new RequestResponse{StatusCode=401,ReasonString="unauthorized"};
        }
    }
}
