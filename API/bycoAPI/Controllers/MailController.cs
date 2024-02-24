using bycoAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        readonly IMailService _mailService;

        public MailController(IMailService mailService)
        {
            this._mailService = mailService;
        }

        [HttpGet]
        public async Task<IActionResult> sendMail()
        {
            await _mailService.SendMessageAsync("cansamet1223@gmail.com", "Deneme Mail", "Bu bir deneme mailidir.");
            return Ok();
        }
    }
}
