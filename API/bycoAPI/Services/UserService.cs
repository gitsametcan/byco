using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;
using System.Security.Cryptography;
using System.Text;

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

        public Task<Result> Register(RegistrationDTO register)
        {
            var emailcheck = _dbContexts.Users.SingleOrDefault(t=> t.email == register.email);
            if (emailcheck is not null) {
                return Task.FromResult(new Result(false, "Email is in use.")); 
            }
            if (register.tip.ToLower() != "bireysel" && register.tip.ToLower() != "kurumsal") {
                return Task.FromResult(new Result(false, "Type not valid.")); 
            }
            User user = new() {
                ad = register.ad,
                email = register.email,
                password = HashString(register.password),
                soyad = register.soyad,
                tip = 2,
                user_id = 0
            };

            KimlikNo kn = new() {
                kimlik_id = 0,
                user_id = 0,
                kimlik_no = ""
            };
            VergiNums vn = new() {
                vergi_id = 0,
                user_id = 0,
                vergi_no = ""
            };

            if (register.tip.ToLower() == "bireysel") {
                kn.kimlik_no = register.vergi_no_kimlik_no;
                user.tip = 2;
            }
            if (register.tip.ToLower() == "kurumsal") {
                vn.vergi_no = register.vergi_no_kimlik_no;
                user.tip = 1;
            }

            _dbContexts.Users.Add(user);
            _dbContexts.SaveChanges();

            var tempUser = _dbContexts.Users.SingleOrDefault(t=> t.email == register.email);
            if (tempUser.tip == 2) {
                kn.user_id = tempUser.user_id;
                _dbContexts.KimlikNo.Add(kn);
                _dbContexts.SaveChanges();
            }
            if (tempUser.tip == 1) {
                vn.user_id = tempUser.user_id;
                _dbContexts.VergiNums.Add(vn);
                _dbContexts.SaveChanges();
            }
            return Task.FromResult(new Result(true));
        }

        public Task<DataResult<Sessions>> LogIn(LogInDTO login)
        {
            var tempUser = _dbContexts.Users.SingleOrDefault(t=> t.email == login.email);
            if (tempUser is null) {
                return Task.FromResult(new DataResult<Sessions>(false,null));
            }
            string pass = HashString(login.password);
            if (pass == tempUser.password) {
                Sessions session = new() {
                    expiration_date = DateTime.Now.AddDays(1),
                    session_id = 0,
                    user_id = tempUser.user_id,
                    session_key = HashString(DateTime.Now.ToString())
                };
                _dbContexts.Sessions.Add(session);
                _dbContexts.SaveChanges();
                return Task.FromResult(new DataResult<Sessions>(true, session));
            }
            return Task.FromResult(new DataResult<Sessions>(false, null));
        }

        public Task<Result> LogOut(string session_key)
        {
            var tempSession = _dbContexts.Sessions.SingleOrDefault(t=> t.session_key == session_key);
            if (tempSession is not null) {
                _dbContexts.Sessions.Remove(tempSession);
                _dbContexts.SaveChanges();
                return Task.FromResult(new Result(true, "Session Deleted"));
            }
            return Task.FromResult(new Result(false, "Session not found."));
        }

        private string HashString(string text) {
            byte[] bytes = Encoding.UTF8.GetBytes(text);
            SHA256Managed hashstring = new SHA256Managed();
            byte[] hash = hashstring.ComputeHash(bytes);
            string hashString = string.Empty;
            foreach (byte x in hash)
            {
                hashString += String.Format("{0:x2}", x);
            }
            return hashString;
        }

        public Task<Result> UpdateUser(int user_id, User body)
        {
            var temp = _dbContexts.Users.SingleOrDefault(t=> t.user_id == user_id);
            if (temp is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            temp.tip = body.tip != default ? body.tip : temp.tip;
            temp.email = body.email != default ? body.email : temp.email;
            temp.password = body.password != default ? body.password : temp.password;
            temp.soyad = body.soyad != default ? body.soyad : temp.soyad;
            temp.ad = body.ad != default ? body.ad : temp.ad;
            temp.telefon = body.telefon != default ? body.telefon : temp.telefon;
            temp.user_id = body.user_id != default ? body.user_id : temp.user_id;
            
            _dbContexts.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<Result> DeleteUser(int user_id)
        {
            var temp = _dbContexts.Users.SingleOrDefault(t=> t.user_id == user_id);
            if (temp is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            _dbContexts.Users.Remove(temp);
            _dbContexts.SaveChanges();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<List<User>> GetAll()
        {
            return Task.FromResult(_dbContexts.Users.ToList());
        }
    }
}
