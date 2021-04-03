using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace ReactAndNet5.Reactivities.Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; } 
        public string Bios { get; set; }

        public ICollection<Photo> Photos {get;set;}
        public ICollection<ActivityAttendee> Activities {set;get;}

        public ICollection<UserFollowing> Followings {set;get;}

        public ICollection<UserFollowing> Followers {set;get;}
    }
}