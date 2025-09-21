# Use official .NET SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY OnlineCarAuction_Microservices.sln ./
COPY src/IdentityService/IdentityService.csproj ./src/IdentityService/

RUN dotnet restore ./src/IdentityService/IdentityService.csproj

COPY . .

RUN dotnet publish ./src/IdentityService/IdentityService.csproj -c Release -o /app/publish

# Use official .NET runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "IdentityService.dll"]