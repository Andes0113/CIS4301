using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace $safeprojectname$.Models
{
    public class Post
    {
        public int PostId { get; set; }
        public string Title { get; set; }

        public string Username { get; set; }
		public string Content { get; set; }
        
        public string Ticker { get; set; }

		[Column(TypeName = "Date")]
		public DateTime TimeStamp { 
            get
            { return TimeStamp; }
            set 
            {
                TimeStamp = value;
                Age = DateTime.Now.Subtract(TimeStamp).Days;
            }
        }
		private int Age { get; set; }

		public Post()
        {
        }
    }
}
