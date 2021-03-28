using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactAndNet5.Reactivities.Application.Photos;

namespace ReactAndNet5.Reactivities.API.Controllers
{
    public class PhotoController : ApiBaseController
    {
        [HttpPost]
        public async Task<IActionResult> UploadPhoto([FromForm] AddPhoto.Command command){
            return HandleResult(await Mediator.Send(command));
        }

         [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(string id){
            return HandleResult(await Mediator.Send(new DeletePhoto.Command{PublicId = id}));
        }
          
          
        [HttpPost("/setmain/{id}")]
        public async Task<IActionResult> SetMain(string id){
            return HandleResult(await Mediator.Send(new MainPhoto.Command{Id = id}));
        }
    }
}