using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace $safeprojectname$.Models
{
    public class StockInstance
    {
        [Key] public int InstanceID { get; set; }
        public string Ticker { get; set; }
        public int Price { get; set; }

		[Column(TypeName= "Date")]
        public DateTime Date { get; set; }
        public StockInstance()
        {

        }
    }
}
