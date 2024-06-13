using System.ComponentModel.DataAnnotations;

namespace LIS_API.Models
{
    public class Product
    {
        [Key]
        public int id { get; set; }
        public Category category { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public string description { get; set; }
        public string created { get; set; }
        public string updated { get; set; }

    }
}
