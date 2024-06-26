﻿using cynology_backend.Data;
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
        List<Models.Thread> threads = _dataContext.Threads
            .Where(z => z.Topic.Equals(topic))
            .Include(x => x.Replies)
            .ToList();

        foreach(var thread in threads)
        {
            thread.CynologyUserId = _dataContext.Users
                .Where(u => u.Id == thread.CynologyUserId)
                .Select(u => $"{u.Name} {u.Surname}")
                .First();
            foreach(var reply in thread.Replies)
            {
                reply.UserId = _dataContext.Users
                    .Where(u => u.Id == reply.UserId)
                    .Select(u => $"{u.Name} {u.Surname}")
                    .First();
            }
        }

        return threads;
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

        thread.CynologyUserId = _dataContext.Users
                    .Where(u => u.Id == thread.CynologyUserId)
                    .Select(u => $"{u.Name} {u.Surname}")
                    .First();

        return Ok(thread);
    }

    [HttpPost("reply-to-thread")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> ReplyToThread([FromBody] ReplyDTO replyDTO)
    {
        var thread = await _dataContext.Threads
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
            UserId = loggedUserId,
            Text = replyDTO.Text,
            DatePosted = DateTime.Now
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

        reply.UserId = _dataContext.Users
                    .Where(u => u.Id == reply.UserId)
                    .Select(u => $"{u.Name} {u.Surname}")
                    .First();

        return Ok(reply);
    }
}
