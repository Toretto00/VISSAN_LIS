using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIS_backend.Models;
using LIS_backend.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace LIS_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InvoicesController : ControllerBase
    {
        private readonly LISContext _context;

        public InvoicesController(LISContext context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return await _context.Invoices.ToListAsync();
        }
        [HttpGet("StoreInvoices")]
        public List<Invoice> GetStoreInvoices(int userid, string from, string to)
        {
            var invoice = new List<Invoice>();
            if (from == null && to == null)
            {
                return invoice = _context.Invoices.Where(x => x.user.id == userid).ToList();
            }
            else if (from != null && to == null)
            {
                return invoice = _context.Invoices.Where(x => x.user.id == userid).Where(x => String.Compare(x.created, from) >= 0).ToList();
            }
            else if (from == null && to != null)
            {
                return invoice = _context.Invoices.Where(x => x.user.id == userid).Where(x => String.Compare(x.created, to) <= 0).ToList();
            }
            else if (from != null && to != null)
            {
                return invoice = _context.Invoices
                    .Where(x => x.user.id == userid)
                    .Where(x => String.Compare(x.created, from) >= 0)
                    .Where(x => String.Compare(x.created, to) <= 0).ToList();
            }

            return invoice;
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetInvoice(int id)
        {
            var invoice = _context.Invoices.Where(x => x.Id == id).Include(x => x.user).FirstOrDefault();

            var products = _context.Invoice_Products.Where(x => x.invoice.Id == id).Include(x => x.product).ToList();

            var store = _context.User_Locations.Where(x => x.user.id == invoice.user.id).Include(x => x.storeLocation).FirstOrDefault();
            
            if (invoice == null)
            {
                //return NotFound();
            }

            return Ok(new { store = store.storeLocation, products = products, date = invoice.date, created = invoice.created, updated = invoice.updated });
        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            if (id != invoice.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Invoice> PostInvoice(List<Invoice_Product> invoice_Products, int user)
        {
            var invoice = new Invoice();
            invoice.user = _context.Users.Where(x=>x.id == user).FirstOrDefault();
            invoice.date = invoice_Products[0].created;
            invoice.status = "Đang xử lý";
            invoice.created = invoice_Products[0].created;
            invoice.updated = invoice_Products[0].updated;
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            for (int i = 0; i < invoice_Products.Count(); i++)
            {
                var product = new Invoice_Product();
                product.invoice = _context.Invoices.Where(x=>x.Id==invoice.Id).FirstOrDefault();
                product.product = _context.Products.Where(x => x.code == invoice_Products[i].product.code).FirstOrDefault();
                product.quantity = invoice_Products[i].quantity;
                product.created = invoice_Products[i].created;
                product.updated = invoice_Products[i].updated;                
                _context.Invoice_Products.Add(product);
                await _context.SaveChangesAsync();
            }

            return invoice;
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.Id == id);
        }
    }
}
