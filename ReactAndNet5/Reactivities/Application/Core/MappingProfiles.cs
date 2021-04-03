using System.Linq;
using AutoMapper;
using ReactAndNet5.Reactivities.Application.Activities;
using ReactAndNet5.Reactivities.Application.Comments;
using ReactAndNet5.Reactivities.Domain;

namespace ReactAndNet5.Reactivities.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles(){
            CreateMap<Activity, Activity>();
            CreateMap<ActivityAttendee,  AttendeeDto>()
            .ForMember(a => a.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(a => a.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(a => a.Image, o =>o.MapFrom(u => u.AppUser.Photos.FirstOrDefault(p => p.IsMain).Url))
            // .ForMember(a => a.Image, o => o.MapFrom(s => s.AppUser.i))
            .ForMember(a => a.Bio, o => o.MapFrom(s => s.AppUser.Bios));


            CreateMap<Activity, Activities.ActivityDto>()
                .ForMember(m => m.HostUsername, s => s.MapFrom(a => a.Attendees.FirstOrDefault()
                .AppUser.UserName));

            CreateMap<AppUser, Profiles.Profile>().ForMember(u => u.Image, o => 
            o.MapFrom(p => p.Photos.FirstOrDefault(pp  => pp.IsMain).Url));


            CreateMap<Comment,  CommentDto>()
            .ForMember(a => a.DisplayName, o => o.MapFrom(s => s.CreatedBy.DisplayName))
            .ForMember(a => a.UserName, o => o.MapFrom(s => s.CreatedBy.UserName))
            .ForMember(a => a.Image, o =>o.MapFrom(u => u.CreatedBy.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}