using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface ISessionsService 
    {
        public Task<Sessions> GetSessionsByIdAsync(int id);
        public Task<List<Sessions>> GetAll();
        public Task<DataResult<int>> ValidateSession(string session_key);
        public Task<Result> AddSession(Sessions req);
        public Task<Result> UpdateSession(int session_id, Sessions body);
        public Task<Result> DeleteSession(int session_id);

    }
}
