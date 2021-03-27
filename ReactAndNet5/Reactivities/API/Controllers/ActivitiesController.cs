using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.Domain;
using ReactAndNet5.Reactivities.Persistance;
using ReactAndNet5.Reactivities.Application.Activities;
using Microsoft.AspNetCore.Authorization;

namespace ReactAndNet5.Reactivities.API.Controllers
{
   // [AllowAnonymous]
    public class ActivitiesController : ApiBaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivites()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
           return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

         [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            //activity.Id = Guid.NewGuid();
           return HandleResult ( await Mediator.Send(new Create.Command{Activity = activity}));

        }

         [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            //activity.Id = Guid.NewGuid();
           return HandleResult ( await Mediator.Send(new UpdateAttendance.Command{Id = id}));

        }


        [Authorize(Policy="IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)
        {
            //activity.Id = Guid.NewGuid();
            activity.Id = id;
           return HandleResult ( await Mediator.Send(new Edit.Command{Activity = activity}));

        }

        [Authorize(Policy="IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
           return HandleResult ( await Mediator.Send(new Delete.Command{Id = id}));

        }
    }
}