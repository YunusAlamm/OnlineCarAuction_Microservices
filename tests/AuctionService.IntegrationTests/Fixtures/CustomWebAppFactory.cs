using Microsoft.AspNetCore.Mvc.Testing;
using Testcontainers.PostgreSql;

namespace AuctionService.IntegrationTests.Fixtures
{
    public class CustomWebAppFactory : WebApplicationFactory<Program>, IAsyncLifetime
    {
        private PostgreSqlContainer _postgreSqlContainer = new PostgreSqlBuilder().Build();
        public Task InitializeAsync()
        {
            throw new NotImplementedException();
        }

        Task IAsyncLifetime.DisposeAsync()
        {
            throw new NotImplementedException();
        }
    }
}
