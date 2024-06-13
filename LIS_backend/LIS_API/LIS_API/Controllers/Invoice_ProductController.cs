using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIS_API.Models;
using LIS_API.DTOs;

namespace LIS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Invoice_ProductController : ControllerBase
    {
        private readonly LISContext _context;

        public Invoice_ProductController(LISContext context)
        {
            _context = context;
        }

        // GET: api/Invoice_Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice_Product>>> GetInvoice_Products()
        {
            return await _context.Invoice_Products.Include(x=>x.product).Include(x=>x.invoice).ToListAsync();
        }

        // GET: api/Invoice_Product/5
        [HttpGet("{id}")]
        public List<Invoice_Product> GetInvoice_Product(int id)
        {
            var invoice_Product = _context.Invoice_Products.Where(x => x.invoice.Id == id)
                .Include(x => x.product)
                .Include(x => x.invoice)
                .ToList();

            if (invoice_Product == null)
            {
                return null;
            }

            return invoice_Product;
        }

        // PUT: api/Invoice_Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice_Product(int id, Invoice_Product invoice_Product)
        {
            if (id != invoice_Product.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoice_Product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Invoice_ProductExists(id))
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

        // POST: api/Invoice_Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Invoice_ProductDTO>> PostInvoice_Product(Invoice_ProductDTO invoice_ProductDTO)
        {
            _context.Invoice_Products.Add(new Invoice_Product()
            {
                product = await _context.Products.FindAsync(invoice_ProductDTO.product),
                invoice = await _context.Invoices.FindAsync(invoice_ProductDTO.invoice),
                quantity = invoice_ProductDTO.quantity,
                created = invoice_ProductDTO.created,
                updated = invoice_ProductDTO.updated,
            });
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoice_Product", new { id = invoice_ProductDTO.Id }, invoice_ProductDTO);
        }

        // DELETE: api/Invoice_Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice_Product(int id)
        {
            var invoice_Product = await _context.Invoice_Products.FindAsync(id);
            if (invoice_Product == null)
            {
                return NotFound();
            }

            _context.Invoice_Products.Remove(invoice_Product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Invoice_ProductExists(int id)
        {
            return _context.Invoice_Products.Any(e => e.Id == id);
        }
    }
}
