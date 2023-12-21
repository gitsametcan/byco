using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        readonly IProjectService userService;

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
    }
}
