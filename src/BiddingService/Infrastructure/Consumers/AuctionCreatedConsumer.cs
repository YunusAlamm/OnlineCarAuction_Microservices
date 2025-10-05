using System;
using BiddingService.Domain;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Infrastructure.Consumers;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        var auction = new Auction
        {
            ID = context.Message.Id.ToString(),
            Seller = context.Message.Seller,
            ReservePrice = context.Message.ReservePrice,
            AuctionEndTime = context.Message.AuctionEndTime
        };

        await auction.SaveAsync();
    }
}
