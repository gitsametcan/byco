using bycoAPI.Models;
using Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace bycoAPI.Interfaces
{
    public interface IProjectService
    {
        public Task<ActionResult<Proje>> GetProjectByIdAsync(int id);

        public Task<ActionResult<IEnumerable<Proje>>> GetAllProjects();

        public DataResult<Proje> ProjeKaydet(Proje proje);
    }
}
