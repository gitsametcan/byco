using bycoAPI.Interfaces;
using bycoAPI.Models;
using bycoAPI.Utils;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace bycoAPI.Services
{
    public class ProjectService : IProjectService
    {
        private readonly DbContexts _dbContexts;
        public ProjectService(DbContexts dbContexts)
        {
            _dbContexts = dbContexts;
        }

        public async Task<ActionResult<Proje>> GetProjectByIdAsync(int id)
        {
            return await _dbContexts.Proje.FindAsync(id);
        }

        public async Task<ActionResult<IEnumerable<Proje>>> GetAllProjects()
        {
            if (_dbContexts.Proje == null)
            {
                return null;
            }
            return await _dbContexts.Proje.ToListAsync();
        }

        public DataResult<Proje> ProjeKaydet(Proje proje)
        {
            _dbContexts.Proje.Add(proje);
            _dbContexts.SaveChangesAsync();

            return new DataResult<Proje>(true, "", proje);
        }
    }
}
