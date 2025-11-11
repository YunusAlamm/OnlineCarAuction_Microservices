using AuctionService.Application.DTOs;
using AuctionService.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuctionService.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuctionsController : ControllerBase
{
   
    private readonly IAuctionService _auctionService;

    public AuctionsController(IAuctionService auctionService)
    {

        _auctionService = auctionService;
    }

    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string date)
    {
        var results = await _auctionService.GetAuctionsAsync(date);
        return results;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
    {
        var result = await _auctionService.GetAuctionByIdAsync(id);

        if (result == null)
            return NotFound();

        return result;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<AuctionDto>> CreateAuction([FromBody] CreateAuctionDto createAuctionDto)
    {
        if (createAuctionDto == null)
        {
            return BadRequest("Auction data is required.");
        }

        var result = await _auctionService.AddAuction(createAuctionDto);



        if (result == null)
            return BadRequest("Could not save changes to database");




        return CreatedAtAction(nameof(GetAuctionById), new { id = result.Id }, result);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAuction([FromBody] UpdateAuctionDto updateAuctionDto, Guid id)
    {





        var result = await _auctionService.UpdateAuction(updateAuctionDto, id);

        return result switch
        {
            "NotFound" => NotFound("Auction not found"),
            "Forbidden" => Forbid("You are not authorized to update this auction"),
            "Failed to Update" => BadRequest("Failed to update auction"),
            "Updated" => Ok("Auction updated successfully"),
            _ => StatusCode(500, "Unexpected error occurred")
        };




    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuction(Guid id)
    {
        var result = await _auctionService.RemoveAuction(id);

        return result switch
        {
            "NotFound" => NotFound("Auction not found"),
            "Forbidden" => Forbid("You are not authorized to update this auction"),
            "Failed to delete auction" => BadRequest("Failed to update auction"),
            "deleted" => Ok("Auction deleted successfully"),
            _ => StatusCode(500, "Unexpected error occurred")
        };
    }






}
