using System.ComponentModel.DataAnnotations;

namespace LIS_API.Models
{
    public class User_Location
    {
        [Key]
        public int Id { get; set; }
        public User user { get; set; }
        public StoreLocation storeLocation { get; set; }
        public string created { get; set; }
        public string updated { get; set; }
    }
}
