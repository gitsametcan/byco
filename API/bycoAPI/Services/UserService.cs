using bycoAPI.Interfaces;
using bycoAPI.Models;

namespace bycoAPI.Services
{
    public class UserService : IUserServices
    {
        public Task<User> GetUserAsync(int id)
        {
            User user = null;

            return Task.FromResult(GetUserFromDb(id));
        }

        private static User GetUserFromDb(int id)
        {

            //Database'den geleni yazacaz
            return new User { Id = 23, Name = "Sam", Email = "mail@mail.com", Password = "jhghj" };
        }
    }
}
