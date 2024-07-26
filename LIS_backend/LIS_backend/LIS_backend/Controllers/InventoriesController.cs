using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIS_backend.Models;
using NuGet.Versioning;
using System.Data;
using DocumentFormat.OpenXml.Office2010.Excel;
using ClosedXML.Excel;
using System.Diagnostics.Tracing;
using ClosedXML.Extensions;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
using Microsoft.AspNetCore.Authorization;
using System.Globalization;
using Microsoft.AspNetCore.Http.HttpResults;
using Humanizer;

namespace LIS_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InventoriesController : ControllerBase
    {
        private readonly LISContext _context;

        public InventoriesController(LISContext context)
        {
            _context = context;
        }

        // GET: api/Inventories
        [HttpGet]
        public List<Inventory> GetInventories(string date)
        {
            var inventory = _context.Inventories.Where(x => x.created.IndexOf(date) != -1).OrderByDescending(x => x.Id).Include(x => x.location).ToList();

            return inventory;
        }
        [HttpGet("StoreInventories")]
        public List<Inventory> GetStoreInventories(string storeid, string from, string to)
        {
            var inventory = new List<Inventory>();
            if (storeid != null)
            {
                if (from == null && to == null)
                {
                    return inventory = _context.Inventories.Where(x => x.location.storeid == storeid).OrderByDescending(x => x.Id).Include(x => x.location).ToList();
                }
                else if (from != null && to == null)
                {
                    inventory = _context.Inventories
                        .Where(x => x.location.storeid == storeid).OrderByDescending(x => x.Id)
                        .Include(x => x.location).ToList();

                    var result = new List<Inventory>();

                    for (int i = 0; i < inventory.Count; i++)
                    {
                        if (CompareDates(inventory[i].created, from) >= 0)
                            result.Add(inventory[i]);
                    }

                    return result;
                }
                else if (from == null && to != null)
                {
                    inventory = _context.Inventories
                        .Where(x => x.location.storeid == storeid).OrderByDescending(x => x.Id)
                        .Include(x => x.location).ToList();

                    var result = new List<Inventory>();

                    for (int i = 0; i < inventory.Count; i++)
                    {
                        if (CompareDates(inventory[i].created, to) <= 0)
                            result.Add(inventory[i]);
                    }

                    return result;
                }
                else if (from != null && to != null) {
                    inventory = _context.Inventories
                        .Where(x => x.location.storeid == storeid).OrderByDescending(x => x.Id)
                        .ToList();

                    var result = new List<Inventory>();

                    for (int i = 0; i < inventory.Count; i++)
                    {
                        if (CompareDates(inventory[i].created, from) >= 0 && CompareDates(inventory[i].created, to) <= 0)
                            result.Add(inventory[i]);
                    }

                    return result;
                }
            } else
            {
                if (from == null && to == null)
                {
                    return inventory = _context.Inventories.Include(x => x.location).OrderByDescending(x => x.Id).ToList();
                }
                else if (from != null && to == null)
                {
                    inventory = _context.Inventories
                        .Include(x => x.location).OrderByDescending(x => x.Id).ToList();

                    var result = new List<Inventory>();

                    for (int i = 0; i < inventory.Count; i++)
                    {
                        if (CompareDates(inventory[i].created, from) >= 0)
                            result.Add(inventory[i]);
                    }

                    return result;
                }
                else if (from == null && to != null)
                {
                    inventory = _context.Inventories
                        .Include(x => x.location).OrderByDescending(x => x.Id).ToList();

                    var result = new List<Inventory>();

                    for (int i = 0; i < inventory.Count; i++)
                    {
                        if (CompareDates(inventory[i].created, to) <= 0)
                            result.Add(inventory[i]);
                    }

                    return result;
                }
                else if (from != null && to != null)
                {
                    inventory = _context.Inventories.Include(x => x.location).OrderByDescending(x => x.Id).ToList();

                    var result = new List<Inventory>();

                    for(int i = 0; i< inventory.Count; i++)
                    {
                        if (CompareDates(inventory[i].created,from) >= 0 && CompareDates(inventory[i].created, to) <= 0)
                            result.Add(inventory[i]);
                    }

                    return result;
                }
            }

            return inventory;
        }
        [HttpPost("ExportExcel")]
        public ActionResult ExportExcel(string from, string to, int id)
        {
            try
            {
                var data = GetData(from, to, id);

                using (XLWorkbook wb = new XLWorkbook())
                {
                    var sheet1 = wb.AddWorksheet(data, "Inventory");
                    using (MemoryStream ms = new MemoryStream())
                    {
                        wb.SaveAs(ms);
                        return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Inventory.xlsx");
                    }
                }

            } catch
            {
                return BadRequest("fail to get data!");
            }            
        }

        [NonAction]
        private DataTable GetData(string from, string to, int id) 
        {
            DataTable dt = new DataTable();
            dt.TableName = "Inventory";
            dt.Columns.Add("Mã cửa hàng", typeof(string));
            dt.Columns.Add("Tên cửa hàng", typeof(string));
            dt.Columns.Add("Hệ thống", typeof(string));
            dt.Columns.Add("Mã sản phẩm", typeof(string));
            dt.Columns.Add("Tên sản phẩm", typeof(string));
            dt.Columns.Add("Số lượng", typeof(int));
            dt.Columns.Add("Ngày", typeof(string));

            var inventory = new List<Inventory>();

            var result = new List<Inventory>();

            if (id != 0)
            {
                result = _context.Inventories
                    .Where(x => x.Id == id).Include(x=>x.location).ToList();
            }
            else
            {
                inventory = _context.Inventories.Include(x=>x.location).ToList();

                //if (from != null && to == null)
                //{                   
                //    for (int i = 0; i < inventory.Count; i++)
                //    {
                //        if (CompareDates(inventory[i].created, from) >= 0)
                //            result.Add(inventory[i]);
                //    }
                //}
                //else if (from == null && to != null)
                //{
                //    for (int i = 0; i < inventory.Count; i++)
                //    {
                //        if (CompareDates(inventory[i].created, to) <= 0)
                //            result.Add(inventory[i]);
                //    }
                //}
                //else if (from != null && to != null)
                //{
                for (int i = 0; i < inventory.Count; i++)
                {
                    if (CompareDates(inventory[i].created, from) >= 0 && CompareDates(inventory[i].created, to) <= 0)
                        result.Add(inventory[i]);
                }
                //}
            }

            for (int i = 0; i < result.Count; i++)
            {
                var products = _context.Inventory_Products
                    .Where(x => x.inventory.Id == result[i].Id)
                    .Include(x => x.product).ToList();
                                
                for(int j=0;j < products.Count; j++)
                {
                    if (products[j].product == null)
                        continue;

                    dt.Rows.Add(result[i].location.storeid,
                        result[i].location.retailname,
                        result[i].location.retailsystem,
                        products[j].product.code,
                        products[j].product.name,
                        products[j].quantity,
                        result[i].created);
                }
            }

            return dt;
        }

        // GET: api/Inventories/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetInventory(int id)
        {
            var inventory = _context.Inventories.Where(x=>x.Id == id).Include(x=>x.location).FirstOrDefault();

            var products = _context.Inventory_Products.Where(x => x.inventory.Id == id).Include(x => x.product).ToList();

            //var temp = new List<Product>();
            //var quantity = new List<int>();

            //for (int i = 0; i< products.Count(); i++)
            //{
            //    temp.Add(products[i].product);
            //    quantity.Add(products[i].quantity);
            //}

            if (inventory == null)
            {
                return NotFound();
            }

            return Ok(new {id = inventory.Id, store = inventory.location, products = products, created = inventory.created, updated = inventory.updated});
        }

        // PUT: api/Inventories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventory(int id, [FromBody] List<Inventory_Product> inventory_products)
        {
            var inventory = await _context.Inventories.Where(x=>x.Id==id).FirstOrDefaultAsync();
            
            if (inventory == null)
            {
                return BadRequest();
            }

            inventory.updated = inventory_products[0].updated;
            _context.SaveChanges();

            if (inventory_products.Count() > 0)
            {
                for (int i = 0; i < inventory_products.Count(); i++)
                {
                    //var temp = _context.Inventory_Products.Where(x => x.id == inventory_products[i].id).FirstOrDefault();
                    
                    if (inventory_products[i] != null)
                    {
                        _context.Entry(inventory_products[i]).State = EntityState.Modified;
                        //if (inventory_products[i].product != null)
                        //{
                        //    temp.product = _context.Products.Where(x => x.code == inventory_products[i].product.code).FirstOrDefault();
                        //}
                        //if (inventory_products[i].quantity != null)
                        //{
                        //    temp.
                        //}
                        try
                        {
                            await _context.SaveChangesAsync();
                        }
                        catch (DbUpdateConcurrencyException)
                        {
                            if (!_context.Inventory_Products.Any(e => e.id == inventory_products[i].id))
                            {
                                return NotFound();
                            }
                            else
                            {
                                throw;
                            }
                        }
                    }
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Edit success");
        }

        // POST: api/Inventories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Inventory> PostInventory(List<Inventory_Product> inventory_Products, string location)
        {
            var inventory = new Inventory();
            inventory.location = _context.StoreLocation.Where(x=>x.storeid == location).FirstOrDefault();
            inventory.created = inventory_Products[0].created;
            inventory.updated = inventory_Products[0].updated;
            _context.Inventories.Add(inventory);
            await _context.SaveChangesAsync();

            for(int i = 0; i < inventory_Products.Count(); i++)
            {
                var product = new Inventory_Product();
                product.inventory = _context.Inventories.Where(x=>x.Id == inventory.Id).FirstOrDefault();
                product.product = _context.Products.Where(x => x.code == inventory_Products[i].product.code).FirstOrDefault();
                product.quantity = inventory_Products[i].quantity;
                product.created = inventory_Products[i].created;
                product.updated = inventory_Products[i].updated;
                _context.Inventory_Products.Add(product);
                await _context.SaveChangesAsync();
            }

            return inventory;
        }

        // DELETE: api/Inventories/5
        [HttpDelete]
        public async Task<IActionResult> DeleteInventory([FromBody] List<int> id)
        {
            for(int i = 0; i < id.Count(); i++)
            {
                var inventory = await _context.Inventories.FindAsync(id[i]);

                if (inventory == null)
                {
                    return NotFound();
                }

                var products = _context.Inventory_Products.Where(x => x.inventory.Id == id[i]).Include(x => x.product).ToList();

                if (products.Count > 0)
                {

                    for (int j = 0; j < products.Count(); j++)
                    {
                        _context.Inventory_Products.Remove(products[j]);
                        await _context.SaveChangesAsync();
                    }
                }

                _context.Inventories.Remove(inventory);
                await _context.SaveChangesAsync();
            }
            

            return Ok("Delete success");
        }

        private bool InventoryExists(int id)
        {
            return _context.Inventories.Any(e => e.Id == id);
        }
        public static int CompareDates(string date1, string date2)
        {
            // Parse the date strings into DateTime objects
            DateTime parsedDate1 = ParseDate(date1);
            DateTime parsedDate2 = ParseDate(date2);

            // Compare the DateTime objects
            return DateTime.Compare(parsedDate1, parsedDate2);
        }

        private static DateTime ParseDate(string date)
        {   
            // Split the date string into day, month, year
            string[] parts = date.Split('/');
            int day = int.Parse(parts[0].Trim());
            int month = int.Parse(parts[1].Trim());
            int year = int.Parse(parts[2].Trim());

            // Create a DateTime object
            return new DateTime(year, month, day);
        }
    }
}
