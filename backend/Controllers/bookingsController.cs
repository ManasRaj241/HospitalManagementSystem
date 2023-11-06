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
    public class bookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public bookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<booking>>> Getbooking()
        {
          if (_context.booking == null)
          {
              return NotFound();
          }
            return await _context.booking.ToListAsync();
        }

        // GET: api/bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<booking>> Getbooking(int id)
        {
          if (_context.booking == null)
          {
              return NotFound();
          }
            var booking = await _context.booking.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // PUT: api/bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putbooking(int id, booking booking)
        {
            if (id != booking.Id)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!bookingExists(id))
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

        // POST: api/bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<booking>> Postbooking(booking booking)
        {
          if (_context.booking == null)
          {
              return Problem("Entity set 'ApplicationDbContext.booking'  is null.");
          }
            _context.booking.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getbooking", new { id = booking.Id }, booking);
        }

        // DELETE: api/bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletebooking(int id)
        {
            if (_context.booking == null)
            {
                return NotFound();
            }
            var booking = await _context.booking.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.booking.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool bookingExists(int id)
        {
            return (_context.booking?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
