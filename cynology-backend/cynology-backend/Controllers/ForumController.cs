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
public class ForumController : ControllerBase
{
    private readonly DataContext _dataContext;

    public ForumController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet("threads-for-topic")]
    public List<Models.Thread> GetThreadsForTopic([FromQuery]string topic) {
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

    [HttpPost("comment-to-reply")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> CommentToReply(string commentId, [FromBody] ReplyDTO replyDTO)
    {
        Reply? threadAccessPoint = await _dataContext.Replies
            .Where(z => z.Id == Guid.Parse(commentId))
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
            DatePosted = replyDTO.DatePosted,
            CommentToReply = Guid.Parse(commentId)
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

    [HttpPost("reply-to-thread")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> ReplyToThread(string threadId, [FromBody] ReplyDTO replyDTO)
    {
        var thread = _dataContext.Threads
            .Where(z => z.Id.Equals(threadId))
            .FirstOrDefaultAsync();

        string? loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(loggedUserId))
        {
            return BadRequest("User ID not found.");
        }

        Reply reply = new Reply
        {
            Id = Guid.NewGuid(),
            ThreadId = Guid.Parse(threadId),
            UserId = Guid.Parse(loggedUserId),
            Text = replyDTO.Text,
            DatePosted = replyDTO.DatePosted,
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
            Replies = null
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
}
