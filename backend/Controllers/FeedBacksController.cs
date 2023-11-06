using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementSystemWebAPI.DatabaseContext;
using HospitalManagementSystemWebAPI.Models;

namespace HospitalManagementSystemWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBacksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FeedBacksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/FeedBacks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedBack>>> GetFeedbacks()
        {
          if (_context.Feedbacks == null)
          {
              return NotFound();
          }
            return await _context.Feedbacks.ToListAsync();
        }

        // GET: api/FeedBacks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FeedBack>> GetFeedBack(int id)
        {
          if (_context.Feedbacks == null)
          {
              return NotFound();
          }
            var feedBack = await _context.Feedbacks.FindAsync(id);

            if (feedBack == null)
            {
                return NotFound();
            }

            return feedBack;
        }

        // PUT: api/FeedBacks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeedBack(int id, FeedBack feedBack)
        {
            if (id != feedBack.Id)
            {
                return BadRequest();
            }

            _context.Entry(feedBack).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedBackExists(id))
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

        // POST: api/FeedBacks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FeedBack>> PostFeedBack(FeedBack feedBack)
        {
          if (_context.Feedbacks == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Feedbacks'  is null.");
          }
            _context.Feedbacks.Add(feedBack);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFeedBack", new { id = feedBack.Id }, feedBack);
        }

        // DELETE: api/FeedBacks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedBack(int id)
        {
            if (_context.Feedbacks == null)
            {
                return NotFound();
            }
            var feedBack = await _context.Feedbacks.FindAsync(id);
            if (feedBack == null)
            {
                return NotFound();
            }

            _context.Feedbacks.Remove(feedBack);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FeedBackExists(int id)
        {
            return (_context.Feedbacks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
