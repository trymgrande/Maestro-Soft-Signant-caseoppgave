using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using ServiceReference1;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Signant_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignantController : ControllerBase
    {
        public readonly IPostingsService _postingsService; // Assuming this is the service client name

        public SignantController(IPostingsService postingsService)
        {
            _postingsService = postingsService; // Inject the Signant service client
        }

        // POST: api/Signant/CreatePosting
        [HttpPost("CreatePosting")]
        public async Task<IActionResult> CreatePosting([FromBody] Posting postData)
        {
            try
            {
                Console.WriteLine("request received");
                var response = await _postingsService.CreateSignPostingAsync("DEV_WSTEST", "DEVACCESSCODE", postData);
                return Ok(response); // Or handle the response as needed
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // GET: api/Signant/GetPostingStatus/{postingId}
        [HttpGet("GetPostingStatus/{postingId}")]
        public async Task<IActionResult> GetPostingStatus(Guid postingId)
        {
            try
            {
                var response = await _postingsService.GetPostingStatusAsync("DEV_WSTEST", "DEVACCESSCODE", postingId);
                return Ok(response); // Or handle the response as needed
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // GET: api/Signant/DownloadAttachment/{postingId}/{attachmentId}
        [HttpGet("DownloadAttachment/{postingId}/{attachmentId}")]
        public async Task<IActionResult> DownloadAttachment(Guid postingId, Guid attachmentId)
        {
            try
            {
                var response = await _postingsService.DownloadAttachmentAsync("DEV_WSTEST", "DEVACCESSCODE", postingId, attachmentId, "AccessToken");
                return File(response.AttachmentFile, "application/pdf", response.FileName);
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
 