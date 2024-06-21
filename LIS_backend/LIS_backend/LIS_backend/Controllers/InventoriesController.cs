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

namespace LIS_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            var inventory = _context.Inventories.Where(x => x.created.IndexOf(date) != -1).Include(x => x.location).ToList();

            return inventory;
        }
        [HttpPost("ExportExcel")]
        public ActionResult ExportExcel(string date)
        {
            var data = GetData(date);
            using (XLWorkbook wb = new XLWorkbook())
            {
                var sheet1 = wb.AddWorksheet(data, "Inventory");
                sheet1.Row(1).CellsUsed().Style.Fill.BackgroundColor = XLColor.Green;
                using (MemoryStream ms = new MemoryStream())
                {
                    wb.SaveAs(ms);
                    return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Inventory.xlsx");
                }
            }
        }

        [NonAction]
        private DataTable GetData(string date) 
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

            //if (id.Count > 0)
            //{
            //    for (int k = 0; k < id.Count; k++)
            //    {
            //        inventory.Add(_context.Inventories
            //    .Where(x => x.created.IndexOf(date) != -1 && x.Id == id[k])
            //    .Include(x => x.location).FirstOrDefault());
            //    }
            //}
            //else
            //{
            //    inventory = _context.Inventories
            //    .Where(x => x.created.IndexOf(date) != -1)
            //    .Include(x => x.location).ToList();
            //}

            inventory = _context.Inventories
                .Where(x => x.created.IndexOf(date) != -1)
                .Include(x => x.location).ToList();

            for (int i = 0; i < inventory.Count(); i++)
            {
                var products = _context.Inventory_Products
                    .Where(x => x.inventory.Id == inventory[i].Id)
                    .Include(x => x.product).ToList();
                                
                for(int j=0;j < products.Count; j++)
                {
                    if (products[j].product == null)
                        continue;

                    dt.Rows.Add(inventory[i].location.storeid,
                        inventory[i].location.retailname,
                        inventory[i].location.retailsystem,
                        products[j].product.code,
                        products[j].product.name,
                        products[j].quantity,
                        inventory[i].created);
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

            return Ok(new { store = inventory.location, products = products, created = inventory.created, updated = inventory.updated});
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
    }
}
