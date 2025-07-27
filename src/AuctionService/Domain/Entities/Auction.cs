using System;
using System.Data;
using AuctionService.Domain.Enums;

namespace AuctionService.Domain.Entities;

public class Auction
{
    public Guid Id { get; set; }
    public int ReservePrice { get; set; } = 0;
    public string Seller { get; set; }
    public string Winner { get; set; }
    public int? SoldAmount { get; set; }
    public int? CurrentHighestBid { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateTime AuctionEndTime { get; set; }
    public Status Status { get; set; }
    public Item Item { get; set; }
    


}
