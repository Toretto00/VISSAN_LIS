using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIS_backend.Models;
using NuGet.Versioning;

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
        public async Task<ActionResult<IEnumerable<Inventory>>> GetInventories()
        {
            return await _context.Inventories.Include(x=>x.location).ToListAsync();
        }

        // GET: api/Inventories/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetInventory(int id)
        {
            var inventory = _context.Inventories.Where(x=>x.Id == id).Include(x=>x.location).FirstOrDefault();

            var products = _context.Inventory_Products.Where(x => x.inventory.Id == id).Include(x => x.product).ToList();

            var temp = new List<Product>();

            for (int i = 0; i< products.Count(); i++)
            {
                temp.Add(products[i].product);
            }

            if (inventory == null)
            {
                return NotFound();
            }

            return Ok(new { store = inventory.location, products = temp});
        }

        // PUT: api/Inventories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventory(int id, Inventory inventory)
        {
            if (id != inventory.Id)
            {
                return BadRequest();
            }

            _context.Entry(inventory).State = EntityState.Modified;

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

            return NoContent();
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventory(int id)
        {
            var inventory = await _context.Inventories.FindAsync(id);
            if (inventory == null)
            {
                return NotFound();
            }

            _context.Inventories.Remove(inventory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InventoryExists(int id)
        {
            return _context.Inventories.Any(e => e.Id == id);
        }
    }
}
