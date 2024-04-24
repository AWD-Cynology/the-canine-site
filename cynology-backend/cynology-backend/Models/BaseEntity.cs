using System.ComponentModel.DataAnnotations;

namespace cynology_backend.Models
{
    public class BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
    }
}
