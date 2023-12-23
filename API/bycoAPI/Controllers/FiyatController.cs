using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiyatController : ControllerBase
    {
        readonly IFiyatService _service;

        public FiyatController(IFiyatService service)
        {
            _service = service;
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Fiyat>> GetFiyatById(int id)
        {
            var result = await _service.GetFiyatByIdAsync(id);

            return result;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Fiyat>>> GetAll() {
            var result = await _service.GetAll();
            return result;
        }

        [HttpGet("FindByUrun/{urun_id}")]
        public async Task<List<Fiyat>> FindByUrun(int urun_id) {
            var result = await _service.GetFiyatlarByUrun(urun_id);
            return result;
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddFiyat([FromBody] Fiyat req) {
            var result = await _service.AddFiyat(req);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpPut("Update/{fiyat_id}")]
        public async Task<ActionResult> UpdateFiyat(int fiyat_id, [FromBody]Fiyat body) {
            var result = await _service.UpdateFiyat(fiyat_id, body);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete("Delete/{fiyat_id}")]
        public async Task<ActionResult> DeleteFiyat(int fiyat_id) {
            var result = await _service.DeleteFiyat(fiyat_id);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
    }
}
