using AuctionService.Application.DTOs;
using AuctionService.Application.Interfaces;
using AuctionService.Presentation.Controllers;
using AutoFixture;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace AuctionService.UnitTests;

public class AuctionControllerTests
{
    private readonly Fixture _fixture;
    private readonly Mock<IAuctionService> _auctionService;
    private readonly AuctionsController _controller;

    public AuctionControllerTests()
    {
        _fixture = new Fixture();
        _auctionService = new Mock<IAuctionService>();
        _controller = new AuctionsController(_auctionService.Object);

    }

    [Fact]
    public async Task GetAllAuctions_WithNoParams_Returns10Auctions()
    {
        // Arrange
        var auctions = _fixture.CreateMany<AuctionDto>(10).ToList();
        _auctionService.Setup(s => s.GetAuctionsAsync(null)).ReturnsAsync(auctions);

        // Act
        var result = await _controller.GetAllAuctions(null);

        // Assert
        Assert.Equal(10, result.Value.Count);
        Assert.IsType<ActionResult<List<AuctionDto>>>(result);

    }

    [Fact]
    public async Task GetAuctionById_WithValidGuid_ReturnsAuction()
    {
        // Arrange
        var auction = _fixture.Create<AuctionDto>();
        _auctionService.Setup(s => s.GetAuctionByIdAsync(auction.Id)).ReturnsAsync(auction);

        // Act
        var result = await _controller.GetAuctionById(auction.Id);

        // Assert
        Assert.Equal(auction.Make, result.Value.Make);
        Assert.IsType<ActionResult<AuctionDto>>(result);

    }

    [Fact]
    public async Task GetAuctionById_WithInvalidGuid_ReturnsNotFound()
    {
        // Arrange
        _auctionService.Setup(s => s.GetAuctionByIdAsync(It.IsAny<Guid>())).ReturnsAsync(value: null);

        // Act
        var result = await _controller.GetAuctionById(Guid.NewGuid());

        // Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task CreateAuction_WithValidCreateAuctionDto_ReturnsCreatedAtAction()
    {
        // Arrange
        var createAuctionDto = _fixture.Create<CreateAuctionDto>();
        var expectedAuctionDto = _fixture.Create<AuctionDto>();
        _auctionService.Setup(s => s.AddAuction(createAuctionDto)).ReturnsAsync(expectedAuctionDto);

        // Act
        var result = await _controller.CreateAuction(createAuctionDto);
        var createdResult = result.Result as CreatedAtActionResult;

        // Assert
        Assert.NotNull(createdResult);
        Assert.Equal("GetAuctionById", createdResult.ActionName);
        Assert.IsType<CreatedAtActionResult>(result.Result);
        Assert.IsType<AuctionDto>(createdResult.Value);
    }

    [Fact]
    public async Task CreateAuction_WithNullCreateAuctionDto_ReturnsBadRequest()
    {
        // Arrange
        _auctionService.Setup(s => s.AddAuction(null)).ReturnsAsync(value: null);

        // Act
        var result = await _controller.CreateAuction(null);

        // Assert
        Assert.IsType<BadRequestObjectResult>(result.Result);

    }

    [Fact]
    public async Task UpdateAuction_WithValidGuidAndUpdateAuctionDto_ReturnsOk()
    {
        // Arrange
        var updateAuctionDto = _fixture.Create<UpdateAuctionDto>();
        var auctionId = Guid.NewGuid();
        _auctionService.Setup(s => s.UpdateAuction(It.IsAny<UpdateAuctionDto>(), It.IsAny<Guid>()))
            .ReturnsAsync("Updated");

        // Act
        var result = await _controller.UpdateAuction(updateAuctionDto, auctionId);

        // Assert
        Assert.IsType<OkObjectResult>(result);
        

    }


}
