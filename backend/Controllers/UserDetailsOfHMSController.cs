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
    public class UserDetailsOfHMSController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserDetailsOfHMSController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserDetailsOfHMS
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDetailsOfHMS>>> GetAppUser()
        {
          if (_context.AppUser == null)
          {
              return NotFound();
          }
            return await _context.AppUser.ToListAsync();
        }

        // GET: api/UserDetailsOfHMS/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDetailsOfHMS>> GetUserDetailsOfHMS(int id)
        {
          if (_context.AppUser == null)
          {
              return NotFound();
          }
            var userDetailsOfHMS = await _context.AppUser.FindAsync(id);

            if (userDetailsOfHMS == null)
            {
                return NotFound();
            }

            return userDetailsOfHMS;
        }

        // PUT: api/UserDetailsOfHMS/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserDetailsOfHMS(int id, UserDetailsOfHMS userDetailsOfHMS)
        {
            if (id != userDetailsOfHMS.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userDetailsOfHMS).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDetailsOfHMSExists(id))
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

        // POST: api/UserDetailsOfHMS
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserDetailsOfHMS>> PostUserDetailsOfHMS(UserDetailsOfHMS userDetailsOfHMS)
        {
          if (_context.AppUser == null)
          {
              return Problem("Entity set 'ApplicationDbContext.AppUser'  is null.");
          }
            _context.AppUser.Add(userDetailsOfHMS);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserDetailsOfHMS", new { id = userDetailsOfHMS.UserId }, userDetailsOfHMS);
        }

        // DELETE: api/UserDetailsOfHMS/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserDetailsOfHMS(int id)
        {
            if (_context.AppUser == null)
            {
                return NotFound();
            }
            var userDetailsOfHMS = await _context.AppUser.FindAsync(id);
            if (userDetailsOfHMS == null)
            {
                return NotFound();
            }

            _context.AppUser.Remove(userDetailsOfHMS);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserDetailsOfHMSExists(int id)
        {
            return (_context.AppUser?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
