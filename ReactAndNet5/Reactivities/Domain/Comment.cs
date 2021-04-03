using System;

namespace ReactAndNet5.Reactivities.Domain
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }    
        public AppUser CreatedBy { get; set; }
        public Activity Activity {set;get;}

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}