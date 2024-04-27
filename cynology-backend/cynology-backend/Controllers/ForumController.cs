using cynology_backend.Data;
using cynology_backend.Models;
using cynology_backend.Models.DTO_s;
using cynology_backend.Models.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace cynology_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        DataContext _dataContext;
        private readonly UserManager<CynologyUser> _userManager;

        public ForumController(DataContext dataContext, UserManager<CynologyUser> userManager)
        {
            _dataContext = dataContext;
            _userManager = userManager;
        }

        [HttpGet("[action]")]
        public List<Models.Thread> GetThreadsForTopic(string topicId) {
            return _dataContext.Threads.Where(z => z.TopicId.Equals(topicId))
                .Include(x => x.Replies)
                .ToList();
        }

        [HttpGet("[action]")]
        public List<Reply> GetRepliesForThreadId(string threadId)
        {
            return _dataContext.Replies.Where(z => z.ThreadId.Equals(threadId)).ToList();
        }
        

        [HttpPost("[action]")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CommentToReply(string commentId, [FromBody] ReplyDTO replyDTO)
        {
            var threadAccessPoint = await _dataContext.Replies.Where(z => z.Id == Guid.Parse(commentId)).FirstOrDefaultAsync();
            var loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(loggedUserId))
            {
                return BadRequest("User ID not found.");
            }

            if (threadAccessPoint == null)
            {
                return BadRequest("Comment for replying not found.");
            }

            var reply = new Reply
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

        [HttpPost("[action]")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> ReplyToThread(string threadId, [FromBody] ReplyDTO replyDTO)
        {
            var thread = _dataContext.Threads.Where(z => z.Id.Equals(threadId)).FirstOrDefaultAsync();
            var loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(loggedUserId))
            {
                return BadRequest("User ID not found.");
            }

            var reply = new Reply
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

        [HttpPost("[action]")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> NewThread([FromBody] ThreadDTO threadDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(loggedUserId))
            {
                return BadRequest("User ID not found.");
            }

            var thread = new Models.Thread
            {
                Id = Guid.NewGuid(),
                TopicId = threadDTO.TopicId,
                CynologyUserId = loggedUserId,
                Title = threadDTO.Title,
                Text = threadDTO.Text,
                DatePosted = threadDTO.DatePosted,
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
}
