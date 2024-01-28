using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace bycoAPI.Services
{
    public class KimlikNoService : IKimlikNoService
    {
        private readonly DbContexts _dbContexts;
        public KimlikNoService(DbContexts dbContexts)
        {
            _dbContexts = dbContexts;
        }

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
            throw new NotImplementedException();
        }
        public Task<Result> AddKimlikNo(KimlikNo req)
        {
            throw new NotImplementedException();
        }
        public Task<Result> UpdateKimlikNo(int kimlik_id, KimlikNo body)
        {
            throw new NotImplementedException();
        }
        public Task<Result> DeleteKimlikNo(int kimlik_id)
        {
            throw new NotImplementedException();
        }
    }
}
