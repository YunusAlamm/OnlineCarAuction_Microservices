# Use official .NET SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY OnlineCarAuction_Microservices.sln ./
COPY src/NotificationService/NotificationService.csproj ./src/NotificationService/
COPY src/Contracts/Contracts.csproj ./src/Contracts/

RUN dotnet restore ./src/NotificationService/NotificationService.csproj

COPY . .

RUN dotnet publish ./src/NotificationService/NotificationService.csproj -c Release -o /app/publish

# Use official .NET runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "NotificationService.dll"]