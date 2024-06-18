using LIS_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIS_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfoController : ControllerBase
    {
        private readonly LISContext _context;

        public InfoController(LISContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetInfo()
        {
            var accountCount = _context.Users.Where(x => x.role == "user").ToList().LongCount();

            var invoiceCount = _context.Invoices.ToList().LongCount();

            var pendingCount = _context.Invoices.Where(x => x.status == "pending").ToList().LongCount();

            var doneCount = _context.Invoices.Where(x => x.status == "done").ToList().LongCount();

            return Ok(new { clients = accountCount, invoices = invoiceCount, pending = pendingCount, done = doneCount });
        }
    }
}
