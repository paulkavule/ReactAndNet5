using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace ReactAndNet5.Reactivities.API.Controllers
{
      [ApiController]
    [Route("[controller]")]
    public class ApiBaseController :ControllerBase
    {
        
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

    }
}