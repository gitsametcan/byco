using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Utils;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SatisController : ControllerBase
    {
        readonly ISatisService _service;

        public SatisController(ISatisService service)
        {
            _service = service;
        }
        [HttpPost("MakePurchase")]
        public async Task<ActionResult> MakePurchase([FromBody]Checkout checkout) {
            Console.WriteLine("Satın Alım Yapılıyor...");
            var result = await _service.MakePurchase(checkout);
            if (result.Success) {
                return Ok();
            }
            return BadRequest(result.Message);
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Satis>> GetSatisById(int id)
        {
            var result = await _service.GetSatisByIdAsync(id);

            return result;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Satis>>> GetAll() {
            var result = await _service.GetAll();
            return result;
        }

        [HttpGet("GetMusteriBilgileri")]
        public async Task<DataResult<List<MusteriBilgi>>> GetMusteriBilgileril() {
            var result = await _service.MusteriBilgileri();
            return result;
        }

        [HttpGet("GetSiparisBilgileri")]
        public async Task<DataResult<List<SiparisBilgi>>> GetSiparisBilgileril() {
            var result = await _service.SiparisBilgileri();
            return result;
        }

        [HttpGet("GetByUser/{user_id}")]
        public async Task<ActionResult<List<Satis>>> GetSatisOfUser(int user_id) {
            var result = await _service.GetSatisOfUser(user_id);
            return result;
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddSatis([FromBody] NewSatisReq req) {
            var result = await _service.AddSatis(req);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
        
        [HttpPut("Update/{satis_id}")]
        public async Task<ActionResult> UpdateSatis(int satis_id, [FromBody]Satis body) {
            var result = await _service.UpdateSatis(satis_id, body);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("Delete/{satis_id}")]
        public async Task<ActionResult> DeleteSatis(int satis_id) {
            var result = await _service.DeleteSatis(satis_id);
            if (result.Success) {
                return Ok();
            }
            return BadRequest();
        }
    }

}

