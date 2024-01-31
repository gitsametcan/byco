using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Services
{
    public class SessionsService(DbContexts dbContexts) : ISessionsService
    {
        private readonly DbContexts _context = dbContexts;

        
        public Task<DataResult<Sessions>> GenerateNewSession(int user_id, DateTime time)
        {
            throw new NotImplementedException();
        }

        public Task<List<Sessions>> GetAll()
        {
            return Task.FromResult(_context.Sessions.ToList());
        }

        public async Task<Sessions> GetSessionsByIdAsync(int id)
        {
            return await _context.Sessions.SingleOrDefaultAsync(t=> t.session_id == id);
        }
        public Task<Result> ValidateSession(string session_key)
        {
            var temp = _context.Sessions.SingleOrDefault(t=> t.session_key == session_key);
            if (temp is null) {
                return Task.FromResult(new Result(false, "Bad Request"));
            }
            if (temp.expiration_date.CompareTo(DateTime.Now) <= 0) {
                _context.Sessions.Remove(temp);
                _context.SaveChanges();
                return Task.FromResult(new Result(false, "Session expired."));
            }
            return Task.FromResult(new Result(true));
        }

        public Task<Result> AddSession(Sessions req)
        {
            _context.Sessions.Add(req);
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK")); 
        }
        public Task<Result> UpdateSession(int session_id, Sessions body) {
            var tempSession = _context.Sessions.SingleOrDefault(t => t.session_id == session_id);
            if (tempSession is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            
            tempSession.session_id = body.session_id != default ? body.session_id : tempSession.session_id;
            tempSession.expiration_date = body.expiration_date != default ? body.expiration_date : tempSession.expiration_date;
            tempSession.session_key = body.session_key != default ? body.session_key : tempSession.session_key;
            tempSession.user_id = body.user_id != default ? body.user_id : tempSession.user_id;
            
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }
        public Task<Result> DeleteSession(int session_id)
        {
            var temp = _context.Sessions.SingleOrDefault(t => t.session_id == session_id);
            if (temp is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            _context.Sessions.Remove(temp);
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }
    }
}
