using AuctionService.Domain.Entities;
using AuctionService.Domain.Interfaces;
using AuctionService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Infrastructure.Repositories
{
    public class AuctionRepository : IAuctionRepository
    {
        private readonly AuctionDbContext _dbContext;

        public AuctionRepository(AuctionDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void AddAuction(Auction auction)
        {
            _dbContext.Auctions.Add(auction);
        }

        public async Task<Auction> GetAuctionByIdAsync(Guid id)
        {
            var auction = await _dbContext.Auctions
                .Where(a => a.Id == id)
                .Include(a => a.Item)
                .FirstOrDefaultAsync();
            return auction;
        }

        public async Task<List<Auction>> GetAuctionsAsync(string date)
        {
            var query = _dbContext.Auctions.Include(a => a.Item).OrderBy(a => a.Item.Make).AsQueryable();
            if (!string.IsNullOrEmpty(date))
            {
                query = query.Where(a => a.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
            }

            return await query.ToListAsync();
        }

        public void RemoveAuction(Auction auction)
        {
            _dbContext?.Auctions.Remove(auction);

        }

        public async Task<bool> SaveChangesAsync()
        {
           return await _dbContext.SaveChangesAsync() > 0;
            
        }
    }
}
