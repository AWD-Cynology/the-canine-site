using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cynology_backend.Models;

public class Thread : BaseEntity
{
    [ForeignKey("Topic")]
    public string TopicId { get; set; }

    [Required]
    public string CynologyUserId { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Text { get; set; }

    [Required]
    public DateTime DatePosted { get; set; }

    public virtual ICollection<Reply> Replies { get; set; }
}
