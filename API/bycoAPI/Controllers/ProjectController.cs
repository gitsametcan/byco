using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService userService;
        private readonly DbContexts _dbContexts;

        public ProjectController(IProjectService userService)
        {
            this.userService = userService;
        }

        [HttpGet("GetProjectById/{id}")]
        public async Task<ActionResult<Proje>> GetProjectById(int id)
        {
            var result = await userService.GetProjectByIdAsync(id);

            return result;
        }

        [HttpGet("GetAllProjects")]
        public async Task<ActionResult<IEnumerable<Proje>>> GetAllProject()
        {
            var result = await userService.GetAllProjects();
            return result;
        }

        [HttpPost("PostProje")]
        public async Task<ActionResult<Proje>> PostProje(Proje proje)
        {
            
            return CreatedAtAction("Kayit",userService.ProjeKaydet(proje).Data);
        }
    }
}
