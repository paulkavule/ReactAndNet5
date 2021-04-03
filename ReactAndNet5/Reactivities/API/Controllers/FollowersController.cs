using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReactAndNet5.Reactivities.Application.Followers;

namespace ReactAndNet5.Reactivities.API.Controllers
{
    public class FollowersController : ApiBaseController
    {
        private readonly IMediator _mediator;

        public FollowersController(IMediator mediator)
        {
            this._mediator = mediator;

        }

        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username)
        {
            return HandleResult(await _mediator.Send(new FollowToggle.Command{ TargetUsername =  username}));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollowing(string username, string predicate)
        {
            return HandleResult(await _mediator.Send(new List.Query{ Userame =  username,Predicate = predicate}));
        }
    }
}