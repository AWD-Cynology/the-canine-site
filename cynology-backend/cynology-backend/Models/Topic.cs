using System.ComponentModel.DataAnnotations;

namespace cynology_backend.Models;

public class Topic
{
    [Key]
    public string callerId { get; set; }

    [Required]
    public string TopicName { get; set; }

    public virtual ICollection<Thread> Threads { get; set; }
}
