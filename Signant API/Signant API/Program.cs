using ServiceReference1;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Add CORS services and define a policy
builder.Services.AddCors(options =>
{
  options.AddPolicy("MyAllowSpecificOrigins",
     builder =>
      {
        builder.WithOrigins("http://localhost:4200")
                 .AllowAnyHeader()
                 .AllowAnyMethod();
      });
});


builder.Services.AddScoped<IPostingsService, PostingsServiceClient>(); // Adjust with the actual implementation class


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use the CORS policy
app.UseCors("MyAllowSpecificOrigins");

app.UseAuthorization();

app.MapControllers();
Console.WriteLine("API running...");
app.Run();
