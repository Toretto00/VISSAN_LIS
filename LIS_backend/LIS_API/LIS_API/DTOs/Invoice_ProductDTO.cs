using LIS_API.Models;
using System.ComponentModel.DataAnnotations;

namespace LIS_API.DTOs
{
    public class Invoice_ProductDTO
    {
        [Key]
        public int Id { get; set; }
        public int product { get; set; }
        public int invoice { get; set; }
        public int quantity { get; set; }
        public string created { get; set; }
        public string updated { get; set; }
    }
}
