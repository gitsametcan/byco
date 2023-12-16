using bycoAPI.Models;

namespace bycoAPI.Interfaces
{
    public interface IUserServices
    {
        public Task<User> GetUserAsync(int id);
    }
}
