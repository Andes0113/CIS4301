using $safeprojectname$.Models;
using Microsoft.EntityFrameworkCore;

namespace $safeprojectname$.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Stock> Stocks { get; set; }

        public DbSet<$safeprojectname$.Models.StockInstance>? StockInstance { get; set; }

        public DbSet<$safeprojectname$.Models.User>? User { get; set; }

        public DbSet<$safeprojectname$.Models.Post>? Post { get; set; }

        public DbSet<$safeprojectname$.Models.PaperTrade>? PaperTrade { get; set; }

        public DbSet<$safeprojectname$.Models.IndexFund>? IndexFund { get; set; }
        

    }
}
