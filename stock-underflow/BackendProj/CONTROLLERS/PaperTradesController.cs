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
    public class PaperTradesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PaperTradesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: PaperTrades
        public async Task<IActionResult> Index()
        {
              return _context.PaperTrade != null ? 
                          View(await _context.PaperTrade.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.PaperTrade'  is null.");
        }

        // GET: PaperTrades/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.PaperTrade == null)
            {
                return NotFound();
            }

            var paperTrade = await _context.PaperTrade
                .FirstOrDefaultAsync(m => m.TradeId == id);
            if (paperTrade == null)
            {
                return NotFound();
            }

            return View(paperTrade);
        }

        // GET: PaperTrades/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: PaperTrades/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("TradeId,Ticker,Username,PurchaseDate,SellDate")] PaperTrade paperTrade)
        {
            if (ModelState.IsValid)
            {
                _context.Add(paperTrade);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(paperTrade);
        }

        // GET: PaperTrades/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.PaperTrade == null)
            {
                return NotFound();
            }

            var paperTrade = await _context.PaperTrade.FindAsync(id);
            if (paperTrade == null)
            {
                return NotFound();
            }
            return View(paperTrade);
        }

        // POST: PaperTrades/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("TradeId,Ticker,Username,PurchaseDate,SellDate")] PaperTrade paperTrade)
        {
            if (id != paperTrade.TradeId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(paperTrade);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PaperTradeExists(paperTrade.TradeId))
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
            return View(paperTrade);
        }

        // GET: PaperTrades/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.PaperTrade == null)
            {
                return NotFound();
            }

            var paperTrade = await _context.PaperTrade
                .FirstOrDefaultAsync(m => m.TradeId == id);
            if (paperTrade == null)
            {
                return NotFound();
            }

            return View(paperTrade);
        }

        // POST: PaperTrades/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.PaperTrade == null)
            {
                return Problem("Entity set 'ApplicationDbContext.PaperTrade'  is null.");
            }
            var paperTrade = await _context.PaperTrade.FindAsync(id);
            if (paperTrade != null)
            {
                _context.PaperTrade.Remove(paperTrade);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PaperTradeExists(int id)
        {
          return (_context.PaperTrade?.Any(e => e.TradeId == id)).GetValueOrDefault();
        }
    }
}
