using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.Application.Core;
using ReactAndNet5.Reactivities.Application.Interfaces;
using ReactAndNet5.Reactivities.Domain;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Body { get; set; }
            public Guid ActivityId { set; get; }
        }

        // Fluid validation

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(r => r.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this._mapper = mapper;
                this._userAccessor = userAccessor;
                this._context = context;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);
                if(activity ==null)return null;

                var user = await _context.Users.Include(p => p.Photos).
                FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName());
                Console.WriteLine("User => "+_userAccessor.GetUserName()+  "------->"+(user == null));
                if(user ==null)return null;

                var comment = new Comment{
                    CreatedBy = user,
                    Body = request.Body,
                    Activity = activity
                };

                activity.Comment.Add(comment);

                if( await _context.SaveChangesAsync() > 0)
                    return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));
                
                return Result<CommentDto>.Failed("Error on saving the comment");
            }
        }
    }
}