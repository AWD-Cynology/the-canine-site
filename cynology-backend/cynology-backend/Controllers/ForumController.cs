using cynology_backend.Data;
using cynology_backend.Models;
using cynology_backend.Models.DTO_s;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace cynology_backend.Controllers;

[Route("api/forum")]
[ApiController]
public class ForumController(DataContext dataContext) : ControllerBase
{
    private readonly DataContext _dataContext = dataContext;

    [HttpGet("threads-for-topic")]
    public List<Models.Thread> GetThreadsForTopic([FromQuery]string topic)
    {
        return _dataContext.Threads.Where(z => z.Topic.Equals(topic))
            .Include(x => x.Replies)
            .ToList();
    }

    [HttpGet("replies-for-thread")]
    public List<Reply> GetRepliesForThread([FromQuery]string threadId)
    {
        return _dataContext.Replies
            .Where(z => z.ThreadId.Equals(threadId))
            .ToList();
    }

    [HttpPost("new-thread")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> NewThread([FromBody] ThreadDTO threadDTO)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        string? loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(loggedUserId))
        {
            return BadRequest("User ID not found.");
        }

        Models.Thread thread = new Models.Thread
        {
            Id = Guid.NewGuid(),
            Topic = threadDTO.Topic,
            CynologyUserId = loggedUserId,
            Title = threadDTO.Title,
            Text = threadDTO.Text,
            DatePosted = DateTime.Now,
            Replies = new List<Reply>()
        };

        _dataContext.Threads.Add(thread);
        try
        {
            await _dataContext.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            return BadRequest($"Error creating new thread: {ex.Message}");
        }

        return Ok(thread);
    }

    [HttpPost("reply-to-thread")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> ReplyToThread([FromBody] ReplyDTO replyDTO)
    {
        var thread = _dataContext.Threads
            .Where(z => z.Id.Equals(replyDTO.ThreadId))
            .FirstOrDefaultAsync();

        string? loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(loggedUserId))
        {
            return BadRequest("User ID not found.");
        }

        Reply reply = new Reply
        {
            Id = Guid.NewGuid(),
            ThreadId = Guid.Parse(replyDTO.ThreadId),
            UserId = Guid.Parse(loggedUserId),
            Text = replyDTO.Text,
            DatePosted = DateTime.Now,
            CommentToReply = null
        };

        _dataContext.Replies.Add(reply);
        try
        {
            await _dataContext.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            return BadRequest($"Error creating adding new Reply: {ex.Message}");
        }

        return Ok(reply);
    }

    [HttpPost("comment-to-reply")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> CommentToReply([FromBody] ReplyDTO replyDTO)
    {
        Reply? threadAccessPoint = await _dataContext.Replies
            .Where(z => z.Id == Guid.Parse(replyDTO.CommentId!))
            .FirstOrDefaultAsync();

        string? loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(loggedUserId))
        {
            return BadRequest("User ID not found.");
        }

        if (threadAccessPoint == null)
        {
            return BadRequest("Comment for replying not found.");
        }

        Reply reply = new Reply
        {
            Id = Guid.NewGuid(),
            ThreadId = threadAccessPoint.ThreadId,
            UserId = Guid.Parse(loggedUserId),
            Text = replyDTO.Text,
            DatePosted = DateTime.Now,
            CommentToReply = Guid.Parse(replyDTO.CommentId!)
        };

        _dataContext.Replies.Add(reply);
        try
        {
            await _dataContext.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            return BadRequest($"Error creating adding new Reply: {ex.Message}");
        }

        return Ok(reply);
    }
}
