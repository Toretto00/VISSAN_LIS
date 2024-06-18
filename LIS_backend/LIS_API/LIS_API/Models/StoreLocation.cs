using System.ComponentModel.DataAnnotations;

namespace LIS_API.Models
{
    public class StoreLocation
    {
        [Key]
        public int id { get; set; }
        public string warehouseID { get; set; }
        public string storeID { get; set; }
        public string retailName { get; set; }
        public string retailSystem { get; set; }
        public string shortname { get; set; }
    }
}
