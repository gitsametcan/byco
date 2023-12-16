namespace bycoAPI.Models
{
    public class LoginResp
    {
        public bool AuthenticateResult { get; set; }
        public string AuthToken { get; set; }
        public DateTime AccessTokenExpireDate { get; set; }
    }
}
