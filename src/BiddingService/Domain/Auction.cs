using System;
using MongoDB.Entities;

namespace BiddingService.Domain;

public class Auction : Entity
{
    public DateTime AuctionEndTime { get; set; }
    public string Seller { get; set; }
    public int ReservePrice { get; set; }
    public bool Finished { get; set; }


}
