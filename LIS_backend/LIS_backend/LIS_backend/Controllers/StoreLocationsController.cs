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
    public class StoreLocationsController : ControllerBase
    {
        private readonly LISContext _context;

        public StoreLocationsController(LISContext context)
        {
            _context = context;
        }

        // GET: api/StoreLocations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoreLocation>>> GetStoreLocation()
        {
            return await _context.StoreLocation.ToListAsync();
        }

        // GET: api/StoreLocations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreLocation>> GetStoreLocation(int id)
        {
            var storeLocation = await _context.StoreLocation.FindAsync(id);

            if (storeLocation == null)
            {
                return NotFound();
            }

            return storeLocation;
        }

        // PUT: api/StoreLocations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoreLocation(int id, StoreLocation storeLocation)
        {
            if (id != storeLocation.id)
            {
                return BadRequest();
            }

            _context.Entry(storeLocation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreLocationExists(id))
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

        // POST: api/StoreLocations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StoreLocation>> PostStoreLocation(StoreLocation storeLocation)
        {
            _context.StoreLocation.Add(storeLocation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStoreLocation", new { id = storeLocation.id }, storeLocation);
        }

        // DELETE: api/StoreLocations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStoreLocation(int id)
        {
            var storeLocation = await _context.StoreLocation.FindAsync(id);
            if (storeLocation == null)
            {
                return NotFound();
            }

            _context.StoreLocation.Remove(storeLocation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreLocationExists(int id)
        {
            return _context.StoreLocation.Any(e => e.id == id);
        }
    }
}
