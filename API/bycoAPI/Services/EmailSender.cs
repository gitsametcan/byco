using MailKit.Security;
using bycoAPI.Interfaces;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;
using bycoAPI.Models;

namespace bycoAPI.Services
{
    public class EmailSender:IEmailSender
    {
        private readonly EmailSeervice _emailConfig;
        public EmailSender(EmailSeervice emailConfig)
        {
            _emailConfig = emailConfig;
        }
        public async Task Send(Message message)
        {
            var obj = new MimeMessage();
            obj.From.Add(new MailboxAddress("BYCO", _emailConfig.Username));
            obj.To.AddRange(message.To);
            obj.Subject = message.Subject;
            obj.Body = new TextPart(TextFormat.Html)
            {
                Text = message.Content
            };

            SecureSocketOptions secureSocket = SecureSocketOptions.None;
            using (var client = new SmtpClient())
            {
                switch (_emailConfig.Security)
                {
                    case "STARTTLS":
                        secureSocket = SecureSocketOptions.StartTls;
                        break;
                    case "TLS":
                        secureSocket = SecureSocketOptions.SslOnConnect;
                        break;
                    default:
                        break;
                }
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                client.Connect(_emailConfig.Host, _emailConfig.Port, secureSocket);
                //Remove any OAuth functionality
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(_emailConfig.Username, _emailConfig.Password);
                client.Send(obj);
                client.Disconnect(true);
            }

        }

        
    }
}
