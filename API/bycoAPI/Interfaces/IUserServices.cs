using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface IUserServices
    {
        public Task<User> GetUserAsync(int id);

        public bool CheckUserExist(LoginReq loginReq);

        public DataResult<User> UserKaydet(User user);

        public Task<Result> Register(RegistrationDTO register); 
        public Task<DataResult<Sessions>> LogIn(LogInDTO login);
        public Task<Result> LogOut(string session_key);
        
    }
}
