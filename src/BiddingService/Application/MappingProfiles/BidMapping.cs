using System;
using AutoMapper;
using BiddingService.Application.DTOs;
using BiddingService.Domain;
using Contracts;

namespace BiddingService.Application.MappingProfiles;

public class BidMapping : Profile
{
    public BidMapping()
    {
        CreateMap<Bid, BidDto>();
        CreateMap<Bid, BidPlaced>();
        
    }

}
