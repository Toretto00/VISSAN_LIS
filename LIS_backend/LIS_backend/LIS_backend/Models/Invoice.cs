using System.ComponentModel.DataAnnotations;

namespace LIS_backend.Models
{
    public class Invoice
    {
        [Key]
        public int Id { get; set; }
        public string date { get; set; }
        public string status { get; set; }
        public User user { get; set; }
        public string created { get; set; }
        public string updated { get; set; }
    }
}
