using System;
using AutoMapper;
using Contracts;
using SearchService.Infrastructure.DatabaseModel;

namespace SearchService.Application.Mappers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<AuctionCreated, Item>();
        
    }

}
