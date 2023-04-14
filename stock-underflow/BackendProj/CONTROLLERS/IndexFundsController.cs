using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using $safeprojectname$.Data;
using $safeprojectname$.Models;

namespace $safeprojectname$.Controllers
{
    public class IndexFundsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public IndexFundsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: IndexFunds
        public async Task<IActionResult> Index()
        {
              return _context.IndexFund != null ? 
                          View(await _context.IndexFund.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.IndexFund'  is null.");
        }

        // GET: IndexFunds/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.IndexFund == null)
            {
                return NotFound();
            }

            var indexFund = await _context.IndexFund
                .FirstOrDefaultAsync(m => m.Id == id);
            if (indexFund == null)
            {
                return NotFound();
            }

            return View(indexFund);
        }

        // GET: IndexFunds/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: IndexFunds/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Username,Ticker")] IndexFund indexFund)
        {
            if (ModelState.IsValid)
            {
                _context.Add(indexFund);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(indexFund);
        }

        // GET: IndexFunds/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.IndexFund == null)
            {
                return NotFound();
            }

            var indexFund = await _context.IndexFund.FindAsync(id);
            if (indexFund == null)
            {
                return NotFound();
            }
            return View(indexFund);
        }

        // POST: IndexFunds/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Username,Ticker")] IndexFund indexFund)
        {
            if (id != indexFund.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(indexFund);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!IndexFundExists(indexFund.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(indexFund);
        }

        // GET: IndexFunds/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.IndexFund == null)
            {
                return NotFound();
            }

            var indexFund = await _context.IndexFund
                .FirstOrDefaultAsync(m => m.Id == id);
            if (indexFund == null)
            {
                return NotFound();
            }

            return View(indexFund);
        }

        // POST: IndexFunds/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.IndexFund == null)
            {
                return Problem("Entity set 'ApplicationDbContext.IndexFund'  is null.");
            }
            var indexFund = await _context.IndexFund.FindAsync(id);
            if (indexFund != null)
            {
                _context.IndexFund.Remove(indexFund);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool IndexFundExists(int id)
        {
          return (_context.IndexFund?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
