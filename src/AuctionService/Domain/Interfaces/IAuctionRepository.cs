using AuctionService.Domain.Entities;

namespace AuctionService.Domain.Interfaces
{
    public interface IAuctionRepository
    {
        Task<List<Auction>> GetAuctionsAsync(string date);
        Task<Auction> GetAuctionByIdAsync(Guid id);
        void AddAuction(Auction auction);

        void RemoveAuction(Auction auction);
        Task<bool> SaveChangesAsync();

    }
}
