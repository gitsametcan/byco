using bycoAPI.Interfaces;
using bycoAPI.Models;

namespace bycoAPI.Services
{
    public class ProjectService : IProjectService
    {

        public Task<Proje> GetProjectByIdAsync(int id)
        {
            return Task.FromResult(GetProjectFromDb(id));
        }

        private static Proje GetProjectFromDb(int id)
        {

            //Database'den geleni yazacaz
            return new Proje { 
                id = 23, 
                ad = "bir",
                lokasyon = "istanbul",
                tamamlanma = "bugün",
                alan = "biryer",
                isveren = "biri",
                aciklama = "bir tür proje",
                img = "dosyayolu.png"
            };
        }

        
    }
}
