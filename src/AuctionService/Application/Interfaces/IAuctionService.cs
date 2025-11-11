using AuctionService.Application.DTOs;

namespace AuctionService.Application.Interfaces
{
    public interface IAuctionService
    {
        Task<List<AuctionDto>> GetAuctionsAsync(string date);
        Task<AuctionDto> GetAuctionByIdAsync(Guid id);
        Task<AuctionDto> AddAuction(CreateAuctionDto auction);
        Task<string> UpdateAuction(UpdateAuctionDto updateAuctionDto, Guid id);
        Task<string> RemoveAuction(Guid id);
        
    }
}
