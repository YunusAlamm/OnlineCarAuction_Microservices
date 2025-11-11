using AuctionService.Application.DTOs;
using AuctionService.Application.Interfaces;
using AuctionService.Domain.Entities;
using AuctionService.Domain.Interfaces;
using AutoMapper;
using Contracts;
using MassTransit;

namespace AuctionService.Application.Services
{
    public class AuctionServices : IAuctionService
    {
        private readonly IAuctionRepository _repository;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;
        private readonly IHttpContextAccessor _httpContext;

        public AuctionServices(IAuctionRepository repository, IMapper mapper, IPublishEndpoint publishEndpoint, IHttpContextAccessor httpContext)
        {
            _repository = repository;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
            _httpContext = httpContext;
        }

        public async Task<AuctionDto> AddAuction(CreateAuctionDto createAuctionDto)
        {
            var auction = _mapper.Map<Auction>(createAuctionDto);

            auction.Seller = _httpContext.HttpContext.User.Identity.Name;
            _repository.AddAuction(auction);

            var newAuction = _mapper.Map<AuctionDto>(auction);
            await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));

            var result = await _repository.SaveChangesAsync();

            if(!result)
                return null;

            return newAuction;


        }

        public async Task<AuctionDto> GetAuctionByIdAsync(Guid id)
        {
            var auction = await _repository.GetAuctionByIdAsync(id);

            if(auction == null)
                return null;

            return _mapper.Map<AuctionDto>(auction);
        }

        public async Task<List<AuctionDto>> GetAuctionsAsync(string date)
        {
            var auctions = await _repository.GetAuctionsAsync(date);

            return _mapper.Map<List<AuctionDto>>(auctions);
        }

        public async Task<string> RemoveAuction(Guid id)
        {
            var auction = await _repository.GetAuctionByIdAsync(id);
            if (auction == null)
                return "Not Found";

            if (auction.Seller != _httpContext.HttpContext.User.Identity.Name)
            {
                return "Forbidden";
            }

            _repository.RemoveAuction(auction);
            await _publishEndpoint.Publish<AuctionDeleted>(new { Id = auction.Id.ToString() });
            var result = await _repository.SaveChangesAsync();


            



            return result ? "deleted" : "Failed to delete auction";

        }

        public async Task<string> UpdateAuction(UpdateAuctionDto updateAuctionDto, Guid id)
        {
            var auction = await _repository.GetAuctionByIdAsync(id);

            if (auction == null)
                return "NotFound";

            if (auction.Seller != _httpContext?.HttpContext.User.Identity.Name)
                return "Forbidden";

            auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
            auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
            auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;
            auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
            auction.Item.ImageUrl = updateAuctionDto.ImageUrl ?? auction.Item.ImageUrl;
            auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
            auction.UpdatedAt = DateTime.UtcNow;

            await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));
            var result = await _repository.SaveChangesAsync();

            return result ? "Updated" : "Failed to Update";

        }
    }
}
