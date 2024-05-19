using cynology_backend.Models;
using cynology_backend.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace cynology_backend.Data;

public class DataContext(DbContextOptions<DataContext> options) : IdentityDbContext<CynologyUser>(options)
{
    public virtual DbSet<Models.Thread> Threads { get; set; }

    public virtual DbSet<Reply> Replies { get; set; }
}
