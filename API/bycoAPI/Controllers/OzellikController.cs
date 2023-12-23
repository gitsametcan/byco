using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OzellikController : ControllerBase
    {
        readonly IOzellikService _service;

        public OzellikController(IOzellikService service)
        {
            _service = service;
        }

        [HttpGet("GetOzellikById/{id}")]
        public async Task<ActionResult<Ozellik>> GetOzellikById(int id)
        {
            var result = await _service.GetOzellikByIdAsync(id);

            return result;
        }

        [HttpGet("GetAll")]
        public async Task<List<Ozellik>> GetAll() {
            var result = await _service.GetAll();
            return result;
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddOzellik([FromBody]Ozellik req) {
            var result = await _service.AddOzellik(req);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpPut("Update")]
        public async Task<ActionResult> UpdateOzellik(int ozellik_id,[FromBody] Ozellik body) {
            var result = await _service.UpdateOzellik(ozellik_id, body);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete("Delete")]
        public async Task<ActionResult> DeleteOzellik(int ozellik_id) {
            var result = await _service.DeleteOzellik(ozellik_id);
            if (result.Success) {
                return Ok();
            }

            return BadRequest();
        }
    }
}
