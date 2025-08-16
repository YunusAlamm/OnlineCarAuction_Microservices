using System;
using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Infrastructure.DatabaseModel;

namespace SearchService.Infrastructure.Consumers;

public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
{
    private readonly IMapper _mapper;

    public AuctionUpdatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        Console.WriteLine($"--> Consuming auction updated: {context.Message.Id}");

        var item = _mapper.Map<Item>(context.Message);

        var result = await DB.Update<Item>()
            .Match(i => i.ID == context.Message.Id)
            .ModifyOnly(x => new
            {
                x.Color,
                x.Make,
                x.Model,
                x.Year,
                x.Mileage,
                x.ImageUrl

            }, item)
            .ExecuteAsync();

        Console.WriteLine($"--> Auction updated successfully With Id: {context.Message.Id}");
    }
}
