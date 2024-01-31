using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KimlikNoController : ControllerBase
    {
        readonly IKimlikNoService _service;

        public KimlikNoController(IKimlikNoService service)
        {
            _service = service;
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<KimlikNo>> GetKimlikNoById(int id)
        {
            var result = await _service.GetKimlikNoByIdAsync(id);

            return result;
        }

        [HttpGet("GetByUserId/{id}")]
        public async Task<ActionResult<KimlikNo>> GetByUserId(int id) {
            var result = await _service.GetKimlikNoByUser(id);
            if (result.Success) {
                return Ok(result.Data);
            }
            return BadRequest();
        }

        [HttpGet("GetAll")]
        public async Task<List<KimlikNo>> GetAll() {
            var result = await _service.GetAll();
            return result;
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddKimlikNo([FromBody]KimlikNo req) {
            var result = await _service.AddKimlikNo(req);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpPut("Update/{kimlik_id}")]
        public async Task<ActionResult> UpdateOzellik(int kimlik_id,[FromBody] KimlikNo body) {
            var result = await _service.UpdateKimlikNo(kimlik_id, body);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete("Delete/{kimlik_id}")]
        public async Task<ActionResult> DeleteKimlikNo(int kimlik_id) {
            var result = await _service.DeleteKimlikNo(kimlik_id);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
    }
}
