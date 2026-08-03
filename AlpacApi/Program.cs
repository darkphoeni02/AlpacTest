using Application;
using Domain;
using Infrastructure;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowCredentials().AllowAnyMethod()));
builder.Services.AddControllers();

builder.Services.AddScoped < IBook,Book>();
var app = builder.Build();


app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
