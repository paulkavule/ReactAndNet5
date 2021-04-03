using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using ReactAndNet5.Reactivities.Application.Comments;

namespace ReactAndNet5.Reactivities.API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            this._mediator = mediator;

        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];
            // var username = httpContext.Request.Query["username"];
            Console.WriteLine("===========> End point hit");
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
            var result = await _mediator.Send(new List.Query{ ActivityId = Guid.Parse(activityId)});
            Console.WriteLine("===========> Result fetched");
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }

        public async Task SendComment(Create.Command command){

           var comment = await _mediator.Send(command);

           await Clients.Group(command.ActivityId.ToString())
           .SendAsync("ReceiveComment", comment.Value);
        }
    }
}