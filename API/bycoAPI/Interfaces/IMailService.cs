namespace bycoAPI.Interfaces
{
    public interface IMailService
    {
        public Task SendMessageAsync(string to, string subject, string body, bool isBodyHtml = true);
        public Task SendMessageAsync(string[] tos, string subject, string body, bool isBodyHtml = true);
    }
}
