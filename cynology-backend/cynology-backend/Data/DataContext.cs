using cynology_backend.Models;
using cynology_backend.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace cynology_backend.Data
{
    public class DataContext : IdentityDbContext<CynologyUser>
    { 
        public DataContext(DbContextOptions<DataContext> options) : base(options) { 

        }

        public virtual DbSet<Topic> Topic { get; set; }
        public virtual DbSet<Models.Thread> Threads { get; set; }
        public virtual DbSet<Reply> Replies { get; set; }

    }
}
