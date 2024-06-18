using System.ComponentModel.DataAnnotations;

namespace LIS_backend.Models
{
    public class StoreLocation
    {
        [Key]
        public int id { get; set; }
        public string warehouseid { get; set; }
        public string storeid { get; set; }
        public string retailname { get; set; }
        public string retailsystem { get; set; }
        public string shortname { get; set; }
    }
}
