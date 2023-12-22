using bycoAPI.Models;
using bycoAPI.Utils;

namespace bycoAPI.Interfaces
{
    public interface IUserServices
    {
        public Task<User> GetUserAsync(int id);

        public bool CheckUserExist(LoginReq loginReq);

        public DataResult<User> UserKaydet(User user);
    }
}
