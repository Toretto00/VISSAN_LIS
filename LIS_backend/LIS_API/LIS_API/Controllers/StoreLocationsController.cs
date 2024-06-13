using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIS_API.Models;

namespace LIS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreLocationsController : ControllerBase
    {
        private readonly LISContext _context;

        public StoreLocationsController(LISContext context)
        {
            _context = context;
        }

        // GET: api/StoreLocations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoreLocation>>> GetStoreLocations()
        {
            return await _context.StoreLocations.ToListAsync();
        }

        // GET: api/StoreLocations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreLocation>> GetStoreLocation(string id)
        {
            var storeLocation = await _context.StoreLocations.FindAsync(id);

            if (storeLocation == null)
            {
                return NotFound();
            }

            return storeLocation;
        }

        // PUT: api/StoreLocations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoreLocation(string id, StoreLocation storeLocation)
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
            _context.StoreLocations.Add(storeLocation);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StoreLocationExists(storeLocation.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStoreLocation", new { id = storeLocation.id }, storeLocation);
        }

        // DELETE: api/StoreLocations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStoreLocation(string id)
        {
            var storeLocation = await _context.StoreLocations.FindAsync(id);
            if (storeLocation == null)
            {
                return NotFound();
            }

            _context.StoreLocations.Remove(storeLocation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreLocationExists(string id)
        {
            return _context.StoreLocations.Any(e => e.id == id);
        }
    }
}
