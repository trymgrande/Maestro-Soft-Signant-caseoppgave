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
        private readonly IPostingsService _postingsService;

        public SignantController(IPostingsService postingsService)
        {
            _postingsService = postingsService;
        }

        // POST: api/Signant/CreatePosting
        [HttpPost("CreatePosting")]
        public async Task<IActionResult> CreatePosting([FromForm] IFormCollection form)
        {
            try
            {
                // Create a Posting object from the form data
                Posting posting = new Posting();

                posting.Title = form["title"];
                posting.Description = form["description"];
                //posting.ActiveTo = DateTime.Parse(form["activeTo"]);
                //posting.WillBeDeletedDateTime = DateTime.Parse(form["willBeDeletedDateTime"]);
                posting.ActiveTo = DateTime.Parse("2024-01-10T09:56:28.051Z");
                posting.WillBeDeletedDateTime = DateTime.Parse("2024-01-10T09:56:28.051Z");
                posting.UseWidget = bool.Parse(form["useWidget"]);
                posting.AutoActivate = bool.Parse(form["autoActivate"]);

                posting.PostingAdmins = Newtonsoft.Json.JsonConvert.DeserializeObject<PostingAdmin[]>(form["postingAdmins"]);
                posting.Recipients = Newtonsoft.Json.JsonConvert.DeserializeObject<Recipient[]>(form["recipients"]);

                // Handle attachments
                var attachmentsList = new List<Attachment>();

                foreach (var file in form.Files)
                {
                    // Convert the file to a byte array or a stream that tje Posting object can accept
                    byte[] fileData = null;
                    using (var ms = new System.IO.MemoryStream())
                    {
                        file.CopyTo(ms);
                        fileData = ms.ToArray();
                    }

                    Attachment attachment = new Attachment
                    {
                        ActionType = ActionType.Sign, // TODO get from attachment parameter
                        File = fileData,
                        FileName = file.FileName
                    };

                    attachmentsList.Add(attachment);
                }

                posting.Attachments = attachmentsList.ToArray();


                // Call the postingsService with the constructed Posting object
                var response = await _postingsService.CreateSignPostingAsync("DEV_WSTEST", "DEVACCESSCODE", posting); // TODO move access codes to client
                return Ok(response);
            }
            catch (Exception ex)
            {
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
                var response = await _postingsService.DownloadAttachmentAsync("DEV_WSTEST", "DEVACCESSCODE", postingId, attachmentId, null);
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
