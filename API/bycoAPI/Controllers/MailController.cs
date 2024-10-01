using bycoAPI.Interfaces;
using bycoAPI.Models;
using bycoAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        readonly IMailService _mailService;
        readonly IEmailSender _emailSender;

        public MailController(IMailService mailService, IEmailSender emailSender)
        {
            this._mailService = mailService;
            _emailSender = emailSender;
        }

        [HttpGet]
        public async Task<IActionResult> sendMail()
        {
            await _mailService.SendMessageAsync("hyavuz@byco.com.tr", "Deneme Mail", "Bu bir deneme mailidir.");
            return Ok();
        }

        [HttpPost("iletisim")]
        public async Task<IActionResult>  iletisimMail([FromBody] MailRequest mailRequest)
        {
            Message message = new Message(new string[] { "contact@byco.com.tr" });
            message.Subject = mailRequest.konu;
            message.Content = mailRequest.mesaj + "<br><br>ALICI:" + mailRequest.isim + "<br>Bilgiler:" + mailRequest.email;
            await _emailSender.Send(message);
            return Ok();
        }

    }
}
