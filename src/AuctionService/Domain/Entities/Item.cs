using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionService.Domain.Entities;

[Table("Items")]
public class Item
{
    public Guid Id { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    public string Color { get; set; }
    public int Mileage { get; set; }
    public string ImageUrl { get; set; }

    // Navigation property to the Auction entity
    public Auction Auction { get; set; }
    public Guid AuctionId { get; set; }



}
