using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.Domain;

namespace ReactAndNet5.Reactivities.Persistance
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ActivityAttendee>(
                x=>x.HasKey(aa =>new {aa.AppUserId, aa.ActivityId})
            ); 
            builder.Entity<ActivityAttendee>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.Activities)
            .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<ActivityAttendee>()
            .HasOne(u => u.Activty)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.ActivityId);

            builder.Entity<Comment>()
            .HasOne(rel => rel.Activity)
            .WithMany(rel => rel.Comment)
            .OnDelete(DeleteBehavior.Cascade);

             builder.Entity<UserFollowing>(b =>{
                 b.HasKey(k => new {k.ObserverId, k.TragetId});
                 b.HasOne(o => o.Observer).WithMany(f => f.Followings)
                 .HasForeignKey(o => o.ObserverId)
                 .OnDelete(DeleteBehavior.Cascade);

                  b.HasOne(o => o.Target).WithMany(f => f.Followers)
                 .HasForeignKey(o => o.TragetId)
                 .OnDelete(DeleteBehavior.Cascade);
             });
        }
        public DataContext(DbContextOptions options) : base(options)
        {

        }
    }
}