using System;
using AuctionService.Infrastructure.Data;
using Grpc.Core;

namespace AuctionService.Presentation.Services;

public class GrpcAuctionService : GrpcAuction.GrpcAuctionBase
{
    private readonly AuctionDbContext _dbContext;

    public GrpcAuctionService(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override async Task<GrpcAuctionResponse> GetAuction(GetAuctionRequest request, ServerCallContext context)
    {
        Console.WriteLine("==> Received Grpc request for auction");

        var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(request.Id)) ?? throw new RpcException(new Status(StatusCode.NotFound, "NotFound"));
        
        var response = new GrpcAuctionResponse
        {
            Auction = new GrpcAuctionModel
            {
                Id = auction.Id.ToString(),
                Seller = auction.Seller,
                ReservePrice = auction.ReservePrice,
                AuctionEndTime = auction.AuctionEndTime.ToString()

            }
        };

        return response;
    }
}
