using Microsoft.AspNetCore.Identity;

namespace ReactAndNet5.Reactivities.Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; } 
        public string Bios { get; set; }
    }
}