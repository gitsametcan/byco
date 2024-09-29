using bycoAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        [HttpPost("process")]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentRequestModel paymentRequest)
        {
            if (paymentRequest == null)
                return BadRequest("Invalid request");

            // Ödeme işlemini gerçekleştir
            var result = await MakePayment(paymentRequest);

            // Banka API'sinden dönen sonucu kontrol et
            if (string.IsNullOrEmpty(result))
                return StatusCode(500, "Ödeme işlemi sırasında hata oluştu.");

            return Ok(result);
        }

        private async Task<string> MakePayment(PaymentRequestModel paymentRequest)
        {
            var httpClient = new HttpClient();
            var requestUrl = "https://sanalposprovtest.garantibbva.com.tr/servlet/gt3dengine";

            var content = new FormUrlEncodedContent(new[]
            {
            new KeyValuePair<string, string>("mode", "PROD"),
            new KeyValuePair<string, string>("apiversion", "512"),
            new KeyValuePair<string, string>("secure3dsecuritylevel", "3D_PAY"),
            new KeyValuePair<string, string>("terminalprovuserid", "PROVAUT"),
            new KeyValuePair<string, string>("terminaluserid", "SANALUSER"),
            new KeyValuePair<string, string>("terminalmerchantid", "7000679"),
            new KeyValuePair<string, string>("terminalid", "30691297"),
            new KeyValuePair<string, string>("orderid", paymentRequest.OrderId),
            new KeyValuePair<string, string>("successurl", "http://localhost:8000/success.html"),
            new KeyValuePair<string, string>("errorurl", "https://localhost:5141/api/error/process-error"),
            new KeyValuePair<string, string>("customeremailaddress", paymentRequest.CustomerEmailAddress),
            new KeyValuePair<string, string>("customeripaddress", paymentRequest.CustomerIpAddress),
            new KeyValuePair<string, string>("companyname", "GARANTI TEST"),
            new KeyValuePair<string, string>("lang", "tr"),
            new KeyValuePair<string, string>("txntimestamp", DateTime.Now.ToString()),
            new KeyValuePair<string, string>("secure3dhash", GetHashData("Byco2024.",paymentRequest.TerminalId,paymentRequest.OrderId,paymentRequest.TxnInstallmentCount,"5369796168426579617a35372e4859414233343537216279",paymentRequest.TxnAmount,paymentRequest.TxnCurrencyCode,paymentRequest.SuccessUrl,paymentRequest.TxnType,paymentRequest.ErrorUrl)),
            new KeyValuePair<string, string>("txnamount", paymentRequest.TxnAmount.ToString()),
            new KeyValuePair<string, string>("txntype", "sales"),
            new KeyValuePair<string, string>("txncurrencycode", paymentRequest.TxnCurrencyCode.ToString()),
            new KeyValuePair<string, string>("txninstallmentcount", paymentRequest.TxnInstallmentCount.ToString()),
            new KeyValuePair<string, string>("cardholdername", paymentRequest.CardHolderName),
            new KeyValuePair<string, string>("cardnumber", paymentRequest.CardNumber),
            new KeyValuePair<string, string>("cardexpiredatemonth", paymentRequest.CardExpireDateMonth),
            new KeyValuePair<string, string>("cardexpiredateyear", paymentRequest.CardExpireDateYear),
            new KeyValuePair<string, string>("cardcvv2", paymentRequest.CardCvv2)
        });

            var response = await httpClient.PostAsync(requestUrl, content);
            return await response.Content.ReadAsStringAsync();
        }

        public static string Sha1(string text)
        {
            var provider = CodePagesEncodingProvider.Instance;
            Encoding.RegisterProvider(provider);

            var cryptoServiceProvider = new SHA1CryptoServiceProvider();
            var inputbytes = cryptoServiceProvider.ComputeHash(Encoding.GetEncoding("ISO-8859-9").GetBytes(text));

            var builder = new StringBuilder();
            for (int i = 0; i < inputbytes.Length; i++)
            {
                builder.Append(string.Format("{0,2:x}", inputbytes[i]).Replace(" ", "0"));
            }

            return builder.ToString().ToUpper();
        }

        public static string Sha512(string text)
        {
            var provider = CodePagesEncodingProvider.Instance;
            Encoding.RegisterProvider(provider);

            var cryptoServiceProvider = new SHA512CryptoServiceProvider();
            var inputbytes = cryptoServiceProvider.ComputeHash(Encoding.GetEncoding("ISO-8859-9").GetBytes(text));

            var builder = new StringBuilder();
            for (int i = 0; i < inputbytes.Length; i++)
            {
                builder.Append(string.Format("{0,2:x}", inputbytes[i]).Replace(" ", "0"));
            }

            return builder.ToString().ToUpper();
        }

        public static string GetHashData(string provisionPassword, string terminalId, string orderId, int installmentCount, string storeKey, ulong amount, int currencyCode, string successUrl, string type, string errorUrl)
        {
            var hashedPassword = Sha1(provisionPassword + "0" + terminalId);
            return Sha512(terminalId + orderId + amount + currencyCode + successUrl + errorUrl + type + installmentCount + storeKey + hashedPassword).ToUpper();
        }
    }
}
