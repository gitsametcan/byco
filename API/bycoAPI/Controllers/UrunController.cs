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
        public async Task<ActionResult<Urun>> GetUrunById(int id)
        {
            var result = await _service.GetUrunByIdAsync(id);

            return result;
        }

        [HttpGet("GetAll")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Urun>>> GetAll()
        {
            var result = await _service.GetAllUrun();

            return result;
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddUrun([FromBody] NewUrunReq req)
        {

            string token = Request.Headers["Authorization"];

            token = token.Substring(7);
            string email = await _tokenService.decodeKey(token);
            User user = await _userService.GetUserByEmail(email);

            if (user.tip == 2)
            {
                var result = await _service.AddUrun(req);
                if (result.Success)
                {
                    return Ok();
                }
                return BadRequest();

            }
            else return Unauthorized();
        }

        [HttpPut("Update/{urun_id}")]
        public async Task<ActionResult> UpdateUrun(int urun_id, [FromBody] Urun body)
        {
            string token = Request.Headers["Authorization"];

            token = token.Substring(7);
            string email = await _tokenService.decodeKey(token);
            User user = await _userService.GetUserByEmail(email);

            if (user.tip == 2)
            {
                var result = await _service.UpdateUrun(urun_id, body);
                if (result.Success)
                {
                    return Ok();
                }
                return BadRequest();
            }
            else return Unauthorized();
        }

        [HttpDelete("Delete/{urun_id}")]
        public async Task<ActionResult> DeleteUrun(int urun_id)
        {
            string token = Request.Headers["Authorization"];

            token = token.Substring(7);
            string email = await _tokenService.decodeKey(token);
            User user = await _userService.GetUserByEmail(email);

            if (user.tip == 2)
            {
                var result = await _service.DeleteUrun(urun_id);
                if (result.Success)
                {
                    return Ok();
                }
                return BadRequest();
            }
            else return Unauthorized();
        }
    }
}
