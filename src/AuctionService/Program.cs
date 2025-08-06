using AuctionService.Application.Mappers;
using AuctionService.Infrastructure.Data;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AuctionDbContext>(options =>
{  
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAutoMapper(typeof(MappingProfiles));

builder.Services.AddMassTransit(x =>
{
    x.UsingRabbitMq((context, cfg) =>
    {

        cfg.ConfigureEndpoints(context);
        // cfg.Host(builder.Configuration["RabbitMQ:Host"], h =>
        // {
        //     h.Username(builder.Configuration["RabbitMQ:Username"]);
        //     h.Password(builder.Configuration["RabbitMQ:Password"]);
        // });
    });
});






var app = builder.Build();

// Configure the HTTP request pipeline.


app.UseAuthorization();
app.MapControllers();

try
{
    DbInitializer.InitDb(app);
}
catch (Exception ex)
{
    Console.WriteLine($"An error occurred while initializing the database: {ex.Message}");
}


app.Run();


