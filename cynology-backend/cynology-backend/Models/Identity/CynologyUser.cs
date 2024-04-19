using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace cynology_backend.Models.Identity
{
    public class CynologyUser : IdentityUser
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Address { get; set; }

    }
}
