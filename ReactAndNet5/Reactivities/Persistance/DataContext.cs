using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.Domain;

namespace ReactAndNet5.Reactivities.Persistance
{
    public class DataContext : DbContext
    {
        public DbSet<Activity> Activities { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {

        }
    }
}