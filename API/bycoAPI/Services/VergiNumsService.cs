using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Services
{
    public class VergiNumsService(DbContexts dbContexts) : IVergiNumsService
    {
        private readonly DbContexts _dbContexts = dbContexts;

        public async Task<VergiNums> GetVergiNumsByIdAsync(int id)
        {
            return await _dbContexts.VergiNums.SingleOrDefaultAsync(t => t.vergi_id == id);
        }
        public async Task<List<VergiNums>> GetAll()
        {
            return await _dbContexts.VergiNums.ToListAsync();
        }

        public Task<DataResult<string>> GetVergiNumsByUser(int user_id)
        {
            var temp = _dbContexts.VergiNums.SingleOrDefault(t=> t.user_id == user_id);
            if (temp is null) {
                return Task.FromResult(new DataResult<string>(false, "BadRequest"));
            }
            return Task.FromResult(new DataResult<string>(true, temp.vergi_no));
        }

        public Task<Result> AddVergiNums(VergiNums req)
        {
            _dbContexts.VergiNums.Add(req);
            _dbContexts.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK")); 
        }

        public Task<Result> UpdateVergiNums(int vergi_id, VergiNums body)
        {
            var tempVerginum = _dbContexts.VergiNums.SingleOrDefault(t => t.vergi_id == vergi_id);
            if (tempVerginum is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            tempVerginum.vergi_id = body.vergi_id != default ? body.vergi_id : tempVerginum.vergi_id;
            tempVerginum.vergi_no = body.vergi_no != default ? body.vergi_no : tempVerginum.vergi_no;
            tempVerginum.user_id = body.user_id != default ? body.user_id : tempVerginum.user_id;
            
            _dbContexts.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<Result> DeleteVergiNums(int vergi_id)
        {
            var temp = _dbContexts.VergiNums.SingleOrDefault(t => t.vergi_id == vergi_id);
            if (temp is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            _dbContexts.VergiNums.Remove(temp);
            _dbContexts.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }
    }
}
