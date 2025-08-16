using System;
using AuctionService.Application.DTOs;
using AuctionService.Domain.Entities;
using AuctionService.Infrastructure.Data;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuctionsController : ControllerBase
{
    private readonly AuctionDbContext _dbContext;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;

    public AuctionsController(AuctionDbContext dbContext, IMapper mapper, IPublishEndpoint publishEndpoint)
    {
        _dbContext = dbContext;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }

    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string date)
    {
        var query = _dbContext.Auctions.OrderBy(x => x.Item.Make).AsQueryable();
        if (!string.IsNullOrEmpty(date))
        {
            query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        }


        return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync(); 
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
    {
        var auction = await _dbContext.Auctions
            .Include(a => a.Item)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (auction == null)
        {
            return NotFound();
        }

        return _mapper.Map<AuctionDto>(auction);
    }

    [HttpPost]
    public async Task<ActionResult<AuctionDto>> CreateAuction([FromBody] CreateAuctionDto createAuctionDto)
    {
        if (createAuctionDto == null)
        {
            return BadRequest("Auction data is required.");
        }

        var auction = _mapper.Map<Auction>(createAuctionDto);
        // TODO: add current user as seller
        auction.Seller = "test";
        _dbContext.Auctions.Add(auction);


        var newAuction = _mapper.Map<AuctionDto>(auction);
        await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));

        var result = await _dbContext.SaveChangesAsync() > 0;


        if (!result)
        {
            return BadRequest("Failed to create auction.");
        }
        return CreatedAtAction(nameof(GetAuctionById), new { id = auction.Id }, newAuction);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAuction([FromBody] UpdateAuctionDto updateAuctionDto, Guid id)
    {
        var auction = await _dbContext.Auctions.Include(a => a.Item).FirstOrDefaultAsync(x => x.Id == id);

        if (auction == null)
        {
            return NotFound();
        }

        // TODO: check seller == username
        auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
        auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
        auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;
        auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
        auction.Item.ImageUrl = updateAuctionDto.ImageUrl ?? auction.Item.ImageUrl;
        auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
        auction.UpdatedAt = DateTime.UtcNow;

        
        await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));

        var result = await _dbContext.SaveChangesAsync() > 0;
        if (!result)
        {
            return BadRequest("Failed to update auction.");
        }
        return Ok();




    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuction(Guid id)
    {
        var auction = await _dbContext.Auctions.FindAsync(id);

        if (auction == null)
        {
            return NotFound();
        }

        // TODO: check seller == username

        _dbContext.Auctions.Remove(auction);
        await _publishEndpoint.Publish<AuctionDeleted>(new {Id = auction.Id.ToString()});
        var result = await _dbContext.SaveChangesAsync() > 0;

        if (!result)
        {
            return BadRequest("Failed to delete auction.");
        }

        return Ok();
    }



   
   

}
