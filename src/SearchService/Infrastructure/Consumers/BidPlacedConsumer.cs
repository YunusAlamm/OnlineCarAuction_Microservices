using System;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Infrastructure.DatabaseModel;

namespace SearchService.Infrastructure.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("--> Consuming bid placed");

        var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

        if (auction.CurrentHighestBid == null
            || context.Message.BidStatus.Contains("Accepted")
            && context.Message.Amount > auction.CurrentHighestBid)
        {
            auction.CurrentHighestBid = context.Message.Amount;

        }

        await auction.SaveAsync();
    }
}
