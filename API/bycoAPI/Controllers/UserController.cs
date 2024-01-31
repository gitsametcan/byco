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
        [HttpPost("RegisterUser")]
        public async Task<ActionResult> RegisterUser([FromBody]RegistrationDTO register)
        {
            var result = await userService.Register(register);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost("LogIn")]
        public async Task<ActionResult<Sessions>> LogIn([FromBody]LogInDTO login)
        {
            var result = await userService.LogIn(login);
            if (result.Success) {
                return Ok(result.Data);
            } 
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost("LogOut/{session_key}")]
        public async Task<ActionResult> LogOut(string session_key)
        {
            var result = await userService.LogOut(session_key);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [AllowAnonymous]
        [HttpPost("PostUser")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            return CreatedAtAction("Kayit", userService.UserKaydet(user).Data);
        }

        [HttpPut("Update/{user_id}")]
        public async Task<ActionResult> UpdateOzellik(int user_id,[FromBody] User body) {
            var result = await userService.UpdateUser(user_id, body);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete("Delete/{user_id}")]
        public async Task<ActionResult> DeleteKimlikNo(int user_id) {
            var result = await userService.DeleteUser(user_id);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("GetAll")]
        public async Task<List<User>> GetAll() {
            var result = await userService.GetAll();
            return result;
        }
    }
}
