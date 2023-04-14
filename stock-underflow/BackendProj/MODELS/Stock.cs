using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace $safeprojectname$.Models
{
    public class Stock
    {
        public int Id { get; set; }
        public string Ticker { get; set; }
        public string CompanyName { get; set; }
        public Stock()
        {
        }
    }
}
