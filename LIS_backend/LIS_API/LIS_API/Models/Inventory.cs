﻿using System.ComponentModel.DataAnnotations;

namespace LIS_API.Models
{
    public class Inventory
    {
        [Key]
        public int Id { get; set; }
        public StoreLocation location { get; set; }
        public Product product { get; set; }
        public int quantity { get; set; }
        public string created {  get; set; }
        public string updated { get; set; }

    }
}
