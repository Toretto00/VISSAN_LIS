using System.ComponentModel.DataAnnotations;

namespace LIS_API.Models
{
    public class Invoice_Product
    {
        [Key]
        public int Id { get; set; }
        public Product product { get; set; }
        public Invoice invoice { get; set; }
        public int quantity { get; set; }
        public string created { get; set; }
        public string updated { get; set; }
    }
}
