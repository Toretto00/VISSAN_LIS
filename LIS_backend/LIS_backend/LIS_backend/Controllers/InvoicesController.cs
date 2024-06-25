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
        public List<Invoice> GetInvoice(int id)
        {
            var invoice = _context.Invoices.Where(x => x.user.id == id).Include(x => x.user).ToList();

            if (invoice == null)
            {
                //return NotFound();
            }

            return invoice;
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
        public async Task<ActionResult<InvoiceDTO>> PostInvoice(InvoiceDTO invoice)
        {
            var newInvoice = new Invoice()
            {
                date = invoice.date,
                status = invoice.status,
                user = await _context.Users.FindAsync(invoice.user),
                created = invoice.created,
                updated = invoice.updated,
            };
            _context.Invoices.Add(newInvoice);
            await _context.SaveChangesAsync();

            //int invoiceId = newInvoice.Id;

            //for (int i = 0; i < products.LongCount(); i++) {
            //    var newInvoiceProduct = new Invoice_Product()
            //    {
            //        user = await _context.Users.FindAsync(invoice.user),
            //        invoice = await _context.Invoices.FindAsync(invoiceId),
            //        quantity = quantity,
            //        created = invoice.created,
            //        updated = invoice.updated,
            //    };
            //    _context.Invoice_Products.Add(newInvoiceProduct);
            //    await _context.SaveChangesAsync();
            //}

            return CreatedAtAction("GetInvoice", new { id = newInvoice.Id }, newInvoice);
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
