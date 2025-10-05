using System;
using AutoMapper;
using BiddingService.Application.DTOs;
using BiddingService.Domain;

namespace BiddingService.Application.MappingProfiles;

public class BidMapping : Profile
{
    public BidMapping()
    {
        CreateMap<Bid, BidDto>();
        
    }

}
