using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Services
{
    public class KimlikNoService(DbContexts dbContexts) : IKimlikNoService
    {
        private readonly DbContexts _dbContexts = dbContexts;

        public async Task<KimlikNo> GetKimlikNoByIdAsync(int id)
        {
            return await _dbContexts.KimlikNo.SingleOrDefaultAsync(t => t.kimlik_id == id);
        }
        public async Task<List<KimlikNo>> GetAll()
        {
            return await _dbContexts.KimlikNo.ToListAsync();
        }
        public Task<DataResult<string>> GetKimlikNoByUser(int user_id)
        {
            var temp = _dbContexts.KimlikNo.SingleOrDefault(t=> t.user_id == user_id);
            if (temp is null) {
                return Task.FromResult(new DataResult<string>(false,"Could not find the user."));
            }
            return Task.FromResult(new DataResult<string>(true, temp.kimlik_no));
        }
        public Task<Result> AddKimlikNo(KimlikNo req)
        {
            _dbContexts.KimlikNo.Add(req);
            _dbContexts.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }
        public Task<Result> UpdateKimlikNo(int kimlik_id, KimlikNo body)
        {
            var tempKimlik = _dbContexts.KimlikNo.SingleOrDefault(t => t.kimlik_id == kimlik_id);
            if (tempKimlik is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            tempKimlik.kimlik_id = body.kimlik_id != default ? body.kimlik_id : tempKimlik.kimlik_id;
            tempKimlik.kimlik_no = body.kimlik_no != default ? body.kimlik_no : tempKimlik.kimlik_no;
            tempKimlik.user_id = body.user_id != default ? body.user_id : tempKimlik.user_id;
            
            _dbContexts.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }
        public Task<Result> DeleteKimlikNo(int kimlik_id)
        {
            var tempKimlik = _dbContexts.KimlikNo.SingleOrDefault(t => t.kimlik_id == kimlik_id);
            if (tempKimlik is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            _dbContexts.KimlikNo.Remove(tempKimlik);
            _dbContexts.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }
    }
}
