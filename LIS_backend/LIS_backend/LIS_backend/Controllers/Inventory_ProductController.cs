using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIS_backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace LIS_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class Inventory_ProductController : ControllerBase
    {
        private readonly LISContext _context;

        public Inventory_ProductController(LISContext context)
        {
            _context = context;
        }

        // GET: api/Inventory_Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inventory_Product>>> GetInventory_Products()
        {
            return await _context.Inventory_Products.Include(x=>x.inventory).Include(x=>x.product).ToListAsync();
        }

        // GET: api/Inventory_Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Inventory_Product>> GetInventory_Product(int id)
        {
            var inventory_Product = await _context.Inventory_Products.FindAsync(id);

            if (inventory_Product == null)
            {
                return NotFound();
            }

            return inventory_Product;
        }

        // PUT: api/Inventory_Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventory_Product(int id, Inventory_Product inventory_Product)
        {
            if (id != inventory_Product.id)
            {
                return BadRequest();
            }

            _context.Entry(inventory_Product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Inventory_ProductExists(id))
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

        // POST: api/Inventory_Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Inventory_Product>> PostInventory_Product(Inventory_Product inventory_Product)
        {
            _context.Inventory_Products.Add(inventory_Product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInventory_Product", new { id = inventory_Product.id }, inventory_Product);
        }

        // DELETE: api/Inventory_Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventory_Product(int id)
        {
            var inventory_Product = await _context.Inventory_Products.FindAsync(id);
            if (inventory_Product == null)
            {
                return NotFound();
            }

            _context.Inventory_Products.Remove(inventory_Product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Inventory_ProductExists(int id)
        {
            return _context.Inventory_Products.Any(e => e.id == id);
        }
    }
}
