using Microsoft.EntityFrameworkCore;

namespace AspNetCoreApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }
    }

    public class TaskItem
    {
        public int Id { get; set; }
        public int Status { get; set; }
        public int Category { get; set; }
        public required string Title { get; set; }
        public required string Detail { get; set; }
        public required string Url { get; set; }
        public DateTime Deadline { get; set; }
    }
}
