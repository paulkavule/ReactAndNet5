using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using ReactAndNet5.Reactivities.Application.Core;
using ReactAndNet5.Reactivities.Domain;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>{
            public CommandValidator()
            {
                RuleFor(cmd => cmd.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                if(activity == null)
                    return null;
                // activity.Title = request.Activity.Title ?? activity.Title;
                _mapper.Map(request.Activity, activity);

                var result = await _context.SaveChangesAsync() > 0;
                if(result)
                return Result<Unit>.Success(Unit.Value) ;

                return Result<Unit>.Failed("Failed to update record with id "+request.Activity.Id);
            }
        }
    }
}