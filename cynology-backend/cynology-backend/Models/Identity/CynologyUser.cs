using Microsoft.AspNetCore.Identity;

namespace cynology_backend.Models.Identity;

public class CynologyUser : IdentityUser
{
    public string? Name { get; set; }

    public string? Surname { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<Thread> Threads { get; set; }
}
