using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace $safeprojectname$.Models
{
    public class IndexFund
    {
        public int Id { get; set; }
        public string Name { get; set; }
		public string Username { get; set; }
		public string Ticker { get; set; }

		public IndexFund()
        {

        }
    }
}
