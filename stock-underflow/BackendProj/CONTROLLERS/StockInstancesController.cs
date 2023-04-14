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
    public class StockInstancesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StockInstancesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: StockInstances
        public async Task<IActionResult> Index()
        {
              return _context.StockInstance != null ? 
                          View(await _context.StockInstance.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.StockInstance'  is null.");
        }

        // GET: StockInstances/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.StockInstance == null)
            {
                return NotFound();
            }

            var stockInstance = await _context.StockInstance
                .FirstOrDefaultAsync(m => m.InstanceID == id);
            if (stockInstance == null)
            {
                return NotFound();
            }

            return View(stockInstance);
        }

        // GET: StockInstances/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: StockInstances/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("InstanceID,Ticker,Price,Date")] StockInstance stockInstance)
        {
            if (ModelState.IsValid)
            {
                _context.Add(stockInstance);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(stockInstance);
        }

        // GET: StockInstances/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.StockInstance == null)
            {
                return NotFound();
            }

            var stockInstance = await _context.StockInstance.FindAsync(id);
            if (stockInstance == null)
            {
                return NotFound();
            }
            return View(stockInstance);
        }

        // POST: StockInstances/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("InstanceID,Ticker,Price,Date")] StockInstance stockInstance)
        {
            if (id != stockInstance.InstanceID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(stockInstance);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StockInstanceExists(stockInstance.InstanceID))
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
            return View(stockInstance);
        }

        // GET: StockInstances/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.StockInstance == null)
            {
                return NotFound();
            }

            var stockInstance = await _context.StockInstance
                .FirstOrDefaultAsync(m => m.InstanceID == id);
            if (stockInstance == null)
            {
                return NotFound();
            }

            return View(stockInstance);
        }

        // POST: StockInstances/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.StockInstance == null)
            {
                return Problem("Entity set 'ApplicationDbContext.StockInstance'  is null.");
            }
            var stockInstance = await _context.StockInstance.FindAsync(id);
            if (stockInstance != null)
            {
                _context.StockInstance.Remove(stockInstance);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool StockInstanceExists(int id)
        {
          return (_context.StockInstance?.Any(e => e.InstanceID == id)).GetValueOrDefault();
        }
    }
}
