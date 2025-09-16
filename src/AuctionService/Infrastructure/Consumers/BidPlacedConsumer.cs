using System;
using AuctionService.Infrastructure.Data;
using Contracts;
using MassTransit;

namespace AuctionService.Infrastructure.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly AuctionDbContext _dbContext;

    public BidPlacedConsumer(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("--> Consuming Bid Placed");

        var auction = await _dbContext.Auctions.FindAsync(context.Message.AuctionId);

        if (auction.CurrentHighestBid == null
            || context.Message.BidStatus.Contains("Accepted")
            && context.Message.Amount > auction.CurrentHighestBid)
        {
            auction.CurrentHighestBid = context.Message.Amount;
            await _dbContext.SaveChangesAsync();
        }

    }
}
