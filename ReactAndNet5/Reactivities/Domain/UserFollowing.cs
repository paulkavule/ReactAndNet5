namespace ReactAndNet5.Reactivities.Domain
{
    public class UserFollowing
    {
        public string ObserverId { get; set; }

        public AppUser Observer {set;get;}

        public string TragetId { get; set; }
        public AppUser Target {set;get;}

        
    }
}