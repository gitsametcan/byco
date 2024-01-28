using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        readonly ISessionsService _service;

        public SessionsController(ISessionsService service)
        {
            _service = service;
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Sessions>> GetById(int id)
        {
            var result = await _service.GetSessionsByIdAsync(id);

            return result;
        }

        [HttpGet("GetAll")]
        public async Task<List<Sessions>> GetAll() {
            var result = await _service.GetAll();
            return result;
        }

        [HttpGet("Validate/{session_key}")]
        public async Task<ActionResult> Validate(string session_key) {
            var result = await _service.ValidateSession(session_key);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddSessions([FromBody]Sessions req) {
            var result = await _service.AddSession(req);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpPut("Update/{session_id}")]
        public async Task<ActionResult> UpdateSessions(int session_id,[FromBody] Sessions body) {
            var result = await _service.UpdateSession(session_id, body);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete("Delete/{session_id}")]
        public async Task<ActionResult> DeleteSessions(int session_id) {
            var result = await _service.DeleteSession(session_id);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
    }
}
