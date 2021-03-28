using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactAndNet5.Reactivities.Application.Profiles;

namespace ReactAndNet5.Reactivities.API.Controllers
{
    public class ProfilesController :ApiBaseController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username){
            return HandleResult(await Mediator.Send( new ProfileDetails.Query{UserName = username}));
        }
    }
}