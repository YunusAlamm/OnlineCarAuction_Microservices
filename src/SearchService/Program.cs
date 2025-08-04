using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Infrastructure.Data;
using SearchService.Infrastructure.DatabaseModel;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

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
