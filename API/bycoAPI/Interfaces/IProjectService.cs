using bycoAPI.Models;

namespace bycoAPI.Interfaces
{
    public interface IProjectService
    {
        public Task<Proje> GetProjectByIdAsync(int id);
    }
}
