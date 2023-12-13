using Microsoft.AspNetCore.Mvc;
using ServiceReference1;

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
                // posting.DistributorID = form["distributorId"]; // TODO avoid hard coding
                // posting.AccessCode = form["accessCode"]; // TODO avoid hard coding
                posting.Title = form["title"];
                posting.Description = form["description"];
                //posting.ActiveTo = DateTime.Parse(form["activeTo"]);
                //posting.WillBeDeletedDateTime = DateTime.Parse(form["willBeDeletedDateTime"]);
                posting.ActiveTo = DateTime.Parse("2024-01-10T09:56:28.051Z"); // TODO avoid hard coding
                posting.WillBeDeletedDateTime = DateTime.Parse("2024-01-10T09:56:28.051Z"); // TODO avoid hard coding
                posting.UseWidget = bool.Parse(form["useWidget"]);
                posting.AutoActivate = bool.Parse(form["autoActivate"]);


                posting.PostingAdmins = Newtonsoft.Json.JsonConvert.DeserializeObject<PostingAdmin[]>(form["postingAdmins"]);
                posting.Recipients = Newtonsoft.Json.JsonConvert.DeserializeObject<Recipient[]>(form["recipients"]);

                // Handle attachments
                // Deserialize the attachment JSON
                var attachmentJson = form["attachment"];
                var attachmentInfo = Newtonsoft.Json.JsonConvert.DeserializeObject<AttachmentInfo>(attachmentJson);


                var attachmentsList = new List<Attachment>();

                foreach (var file in form.Files)
                {
                    // Convert the file to a byte array or a stream that the Posting object can accept
                    byte[] fileData = null;
                    using (var ms = new System.IO.MemoryStream())
                    {
                        file.CopyTo(ms);
                        fileData = ms.ToArray();
                    }

                    Attachment attachment = new Attachment
                    {
                        ActionType = (ActionType)attachmentInfo.ActionType,
                        File = fileData,
                        FileName = file.FileName
                    };

                    attachmentsList.Add(attachment);
                }

                posting.Attachments = attachmentsList.ToArray();


                // Call the postingsService with the constructed Posting object
                var response = await _postingsService.CreateSignPostingAsync("DEV_WSTEST", "DEVACCESSCODE", posting); // TODO avoid plain text and hard coding
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        public class AttachmentInfo
        {
            public int ActionType { get; set; }
            public string Description { get; set; }
            public string FileName { get; set; }
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
