using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrunController : ControllerBase
    {
        readonly IUrunService _service;

        public UrunController(IUrunService service)
        {
            _service = service;
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Urun>> GetUrunById(int id)
        {
            var result = await _service.GetUrunByIdAsync(id);

            return result;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Urun>>> GetAll()
        {
            var result = await _service.GetAllUrun();

            return result;
        }

        [HttpGet("GetByIdResponse/{urun_id}")]
        public async Task<UrunResponse> GetByIdResponse(int urun_id) {
            var result = await _service.GetByIdResponse(urun_id);
            return result;
        }

        [HttpGet("GetAllResponse")]
        public async Task<List<UrunResponse>> GetAllUrunResponse() {
            var result = await _service.GetAllUrunResponse();
            return result;
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddUrun([FromBody] NewUrunReq req) {
            var result = await _service.AddUrun(req);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut("Update/{urun_id}")]
        public async Task<ActionResult> UpdateUrun(int urun_id, [FromBody] Urun body) {
            var result = await _service.UpdateUrun(urun_id, body);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("Delete/{urun_id}")]
        public async Task<ActionResult> DeleteUrun(int urun_id) {
            var result = await _service.DeleteUrun(urun_id);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
    }
}
