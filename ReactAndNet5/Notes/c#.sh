dotnet ef migrations add [MigrationName] -p [Project that contains the data context] -s [startup project] -- this adds a migrations
ef migrations remove [MigrationName] - this removes a migration

DTO - Data transfer object - an object that carries data between processes
 dotnet sln add infrastructure => adds project to the solution
 dotnet add reference ..\Application\ => add the project to the current soln
 dotnet restore => cleans out everything, and updates all dependencies
 dotnet ef database drop -p Persistance -s Api => drops the database;