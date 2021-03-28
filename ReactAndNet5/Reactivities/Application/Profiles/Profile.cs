using System.Collections.Generic;
using ReactAndNet5.Reactivities.Domain;

namespace ReactAndNet5.Reactivities.Application.Profiles
{
    public class Profile{
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}