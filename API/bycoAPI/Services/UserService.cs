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
            return new User { 
                id = 23, 
                ad = "Sam", 
                email = "mail@mail.com", 
                password = "jhghj" 
            };
        }
    }
}
