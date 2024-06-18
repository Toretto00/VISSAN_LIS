using System.ComponentModel.DataAnnotations;

namespace LIS_backend.Models
{
    public class Category
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string code { get; set; }
    }
}
