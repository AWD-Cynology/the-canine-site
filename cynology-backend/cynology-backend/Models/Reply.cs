using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cynology_backend.Models;

public class Reply : BaseEntity 
{
    [ForeignKey("Thread")]
    public Guid ThreadId { get; set; }

    [ForeignKey("CynologyUser")]
    public Guid UserId { get; set; }

    [Required]
    public string Text { get; set; }

    [Required]
    public DateTime DatePosted { get; set; }

    public Guid? CommentToReply { get; set; }
}
