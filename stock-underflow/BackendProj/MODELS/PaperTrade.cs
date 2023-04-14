using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace $safeprojectname$.Models
{
    public class PaperTrade
    {
        [Key] public int TradeId { get; set; }
        public string Ticker { get; set; }
        public string Username { get; set; }

		[Column(TypeName = "Date")]
		public DateTime PurchaseDate { get; set; }
		[Column(TypeName = "Date")]
		public DateTime SellDate { get; set; }

		public PaperTrade ()
        {
        }
    }
}
