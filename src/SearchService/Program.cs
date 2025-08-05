using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Infrastructure.Data;
using SearchService.Infrastructure.DatabaseModel;
using SearchService.Infrastructure.SvcComunications;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpClient<AuctionSvcHttpClient>();

var app = builder.Build();

// Configure the HTTP request pipeline.



app.UseAuthorization();

app.MapControllers();

try
{
    await DbInitializer.InitDb(app);
}
catch (Exception ex)
{
    Console.WriteLine($"An error occurred while initializing the database: {ex.Message}");
    throw;
    
}
   


app.Run();
