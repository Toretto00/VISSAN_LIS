using System.ComponentModel.DataAnnotations;

namespace LIS_API.DTOs
{
    public class InvoiceDTO
    {
        [Key]
        public int Id { get; set; }
        public string date { get; set; }
        public string status { get; set; }
        public int user { get; set; }
        public string created { get; set; }
        public string updated { get; set; }
    }
}
