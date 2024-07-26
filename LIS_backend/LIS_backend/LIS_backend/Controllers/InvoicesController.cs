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
using Microsoft.AspNetCore.Http.HttpResults;

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
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices(string storeid, string from, string to, string status)
        {
            try
            {
                var invoices = await _context.Invoices.Where(x => (status == null || x.status == status) && (storeid == null || x.location.storeid == storeid)).Include(x => x.location).OrderByDescending(x => x.Id).ToListAsync();

                DateTime now = new DateTime();
                now = DateTime.Now;
                if (from != null && to == now.ToString("dd/MM/yyyy"))
                {
                    return Ok(invoices);
                }
                else
                {
                    var result = new List<Invoice>();

                    foreach (var invoice in invoices)
                    {
                        if ((from == null || CompareDates(invoice.created, from) >= 0) && CompareDates(invoice.created, to) <= 0)
                            result.Add(invoice);
                    }

                    return Ok(result);
                }
            }
            catch (Exception ex) 
            {
                throw new Exception(status, ex);    
            }          
        }
        //[HttpGet("StoreInvoices")]
        //public List<Invoice> GetStoreInvoices(int userid, string from, string to)
        //{
        //    var invoice = new List<Invoice>();
        //    if (from == null && to == null)
        //    {
        //        return invoice = _context.Invoices.Where(x => x.user.id == userid).ToList();
        //    }
        //    else if (from != null && to == null)
        //    {
        //        return invoice = _context.Invoices.Where(x => x.user.id == userid).Where(x => String.Compare(x.created, from) >= 0).ToList();
        //    }
        //    else if (from == null && to != null)
        //    {
        //        return invoice = _context.Invoices.Where(x => x.user.id == userid).Where(x => String.Compare(x.created, to) <= 0).ToList();
        //    }
        //    else if (from != null && to != null)
        //    {
        //        return invoice = _context.Invoices
        //            .Where(x => x.user.id == userid)
        //            .Where(x => String.Compare(x.created, from) >= 0)
        //            .Where(x => String.Compare(x.created, to) <= 0).ToList();
        //    }

        //    return invoice;
        //}

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetInvoiceDetail(int id)
        {
            var invoice = await _context.Invoices.Where(x => x.Id == id).Include(x => x.location).FirstOrDefaultAsync();
            
            if (invoice == null)
            {
                return NotFound("No invoice data.");
            }

            var invoice_products = await _context.Invoice_Products.Where(x => x.invoice.Id == id).Include(x => x.product).ToListAsync();

            return Ok(new { store = invoice.location, products = invoice_products });
        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            //if (id != invoice.Id)
            //{
            //    return BadRequest();
            //}

            //_context.Entry(invoice).State = EntityState.Modified;

            var findinvoice = await _context.Invoices.Where(x => x.Id == id).FirstOrDefaultAsync();

            if (findinvoice == null)
            {
                return BadRequest("No invoice data.");
            }

            findinvoice.status = invoice.status;

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

            return Ok("Save change successfull!");
        }

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(List<Invoice_Product> invoice_Products, int user, string storeid)
        {
            try
            {
                var invoice = new Invoice();
                invoice.date = DateTime.Now.ToString("dd/MM/yyyy");
                invoice.status = "pending";
                invoice.user = _context.Users.Where(x => x.id == user).FirstOrDefault();
                invoice.location = _context.StoreLocation.Where(x => x.storeid == storeid).FirstOrDefault();
                invoice.created = DateTime.Now.ToString("dd/MM/yyyy");
                invoice.updated = DateTime.Now.ToString("dd/MM/yyyy");

                _context.Invoices.Add(invoice);
                await _context.SaveChangesAsync();

                for (int i = 0; i < invoice_Products.Count(); i++)
                {
                    var product = new Invoice_Product();
                    product.invoice = _context.Invoices.Where(x => x.Id == invoice.Id).FirstOrDefault();
                    product.product = _context.Products.Where(x => x.code == invoice_Products[i].product.code).FirstOrDefault();
                    product.quantity = invoice_Products[i].quantity;
                    product.created = DateTime.Now.ToString("dd/MM/yyyy");
                    product.updated = DateTime.Now.ToString("dd/MM/yyyy");
                    _context.Invoice_Products.Add(product);
                    await _context.SaveChangesAsync();
                }

                return Ok(invoice);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound("No invoice data");
            }

            _context.Invoice_Products.RemoveRange(_context.Invoice_Products.Where(x=>x.invoice.Id == id));

            _context.Invoices.Remove(invoice);

            await _context.SaveChangesAsync();

            return Ok("Delete invoice " + id + " success!");
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.Id == id);
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
