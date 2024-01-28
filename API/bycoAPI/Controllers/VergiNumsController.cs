using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VergiNumsController : ControllerBase
    {
        readonly IVergiNumsService _service;

        public VergiNumsController(IVergiNumsService service)
        {
            _service = service;
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<VergiNums>> GetById(int id)
        {
            var result = await _service.GetVergiNumsByIdAsync(id);

            return result;
        }

        [HttpGet("GetByUserId/{id}")]
        public async Task<ActionResult<VergiNums>> GetByUserId(int id) {
            var result = await _service.GetVergiNumsByUser(id);
            if (result.Success) {
                return Ok(result.Data);
            }
            return BadRequest();
        }

        [HttpGet("GetAll")]
        public async Task<List<VergiNums>> GetAll() {
            var result = await _service.GetAll();
            return result;
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddVergiNums([FromBody]VergiNums req) {
            var result = await _service.AddVergiNums(req);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpPut("Update/{vergi_id}")]
        public async Task<ActionResult> UpdateVergiNums(int vergi_id,[FromBody] VergiNums body) {
            var result = await _service.UpdateVergiNums(vergi_id, body);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete("Delete/{vergi_id}")]
        public async Task<ActionResult> DeleteVergiNums(int vergi_id) {
            var result = await _service.DeleteVergiNums(vergi_id);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
    }
}
