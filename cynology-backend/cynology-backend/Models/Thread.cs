using System.ComponentModel.DataAnnotations;

namespace cynology_backend.Models;

public class Thread : BaseEntity
{
    public string Topic { get; set; }

    [Required]
    public string CynologyUserId { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Text { get; set; }

    [Required]
    public DateTime DatePosted { get; set; }

    public virtual ICollection<Reply>? Replies { get; set; }
}
