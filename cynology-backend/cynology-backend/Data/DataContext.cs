using cynology_backend.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace cynology_backend.Data
{
    public class DataContext : IdentityDbContext<CynologyUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { 

        }
    }
}
