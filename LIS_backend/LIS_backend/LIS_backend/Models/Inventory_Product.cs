using System.ComponentModel.DataAnnotations;

namespace LIS_backend.Models
{
    public class Inventory_Product
    {
        [Key]
        public int id { get; set; }
        public Inventory inventory { get; set; }
        public Product product { get; set; }
        public int quantity { get; set; }
        public string created { get; set; }
        public string updated { get; set; }
    }
}
