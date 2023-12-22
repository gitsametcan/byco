using bycoAPI.Interfaces;
using bycoAPI.Models;
using bycoAPI.Utils;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace bycoAPI.Services
{
    public class UserService : IUserServices
    {

        private readonly DbContexts _dbContexts;
        public UserService(DbContexts dbContexts)
        {
            _dbContexts = dbContexts;
        }
        public Task<User> GetUserAsync(int id)
        {
            User user = null;

            return Task.FromResult(GetUserFromDb(id));
        }

        private User GetUserFromDb(int id)
        {

            User user = _dbContexts.Users
            .FirstOrDefault(u => u.user_id == id);

            return user;
        }

        public DataResult<User> UserKaydet(User user)
        {
            _dbContexts.Users.Add(user);
            _dbContexts.SaveChangesAsync();

            return new DataResult<User>(true, "", user);
        }

        public bool CheckUserExist(LoginReq loginReq)
        {
            if(_dbContexts.Users == null) return false;
            User user = _dbContexts.Users
            .FirstOrDefault(u => u.email == loginReq.email
            && u.password == loginReq.password);

            return true;
        }
    }
}
