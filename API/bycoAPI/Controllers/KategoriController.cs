using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Utils;

namespace bycoAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class KategoriController : ControllerBase {
        readonly IKategoriService _service;

        public KategoriController(IKategoriService service) {
            _service = service;
        }

        [HttpGet("GetById/{kategori_id}")]
        public async Task<KategoriResponse> GetById(int kategori_id) {
            var result = await _service.GetKategoriByIdAsync(kategori_id);
            return result;
        }
        [HttpGet("GetAll")]
        public async Task<List<KategoriResponse>> GetAll() {
            var result = await _service.GetAll();
            return result;
        }
        [HttpPost("Add")]
        public async Task<ActionResult> AddKategori([FromBody]Kategori req) {
            var result = await _service.AddKategori(req);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpPut("Update/{kategori_id}")]
        public async Task<ActionResult> UpdateKategori(int kategori_id, [FromBody] Kategori body) {
            var result = await _service.UpdateKategori(kategori_id, body);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete("Delete")]
        public async Task<ActionResult> DeleteKategori(int kategori_id) {
            var result = await _service.DeleteKategori(kategori_id);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }

    }
}
