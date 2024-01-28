using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface IVergiNumsService 
    {
        public Task<VergiNums> GetVergiNumsByIdAsync(int id);
        public Task<List<VergiNums>> GetAll();
        public Task<DataResult<string>> GetVergiNumsByUser(int user_id);
        public Task<Result> AddVergiNums(VergiNums req);
        public Task<Result> UpdateVergiNums(int vergi_id, VergiNums body);
        public Task<Result> DeleteVergiNums(int vergi_id);


    }
}
