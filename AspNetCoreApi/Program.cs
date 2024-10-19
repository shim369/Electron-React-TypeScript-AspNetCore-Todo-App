using Microsoft.EntityFrameworkCore;
using AspNetCoreApi.Data;

var builder = WebApplication.CreateBuilder(args);

// PostgreSQL データベースへの接続文字列を指定
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));  // Npgsql を使用して PostgreSQL に接続

// CORS 設定を追加
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();  // MVC コントローラーを追加

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS を適用
app.UseCors("AllowSpecificOrigin");

// Tasks エンドポイントを追加
app.MapGet("/tasks", async (AppDbContext db) =>
{
    return await db.Tasks.ToListAsync();
})
.WithName("GetTasks")
.WithOpenApi();

app.MapDelete("/tasks/{id}", async (AppDbContext db, int id) =>
{
    var task = await db.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    db.Tasks.Remove(task);
    await db.SaveChangesAsync();
    return Results.NoContent();
})
.WithName("DeleteTask")
.WithOpenApi();

app.MapPost("/tasks", async (AppDbContext db, TaskItem task) =>
{
    // DeadlineがUTCであることを確認
    if (task.Deadline.Kind != DateTimeKind.Utc)
    {
        task.Deadline = DateTime.SpecifyKind(task.Deadline, DateTimeKind.Utc);
    }

    db.Tasks.Add(task);
    await db.SaveChangesAsync();
    return Results.Created($"/tasks/{task.Id}", task);
})
.WithName("CreateTask")
.WithOpenApi();

app.MapGet("/tasks/{id}", async (AppDbContext db, int id) =>
{
    var task = await db.Tasks.FindAsync(id);
    return task is not null ? Results.Ok(task) : Results.NotFound();
})
.WithName("GetTaskById")
.WithOpenApi();

app.MapPut("/tasks/{id}", async (AppDbContext db, int id, TaskItem updatedTask) =>
{
    var task = await db.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();
    task.Status = updatedTask.Status;
    task.Category = updatedTask.Category;
    task.Title = updatedTask.Title;
    task.Detail = updatedTask.Detail;
    task.Url = updatedTask.Url;
    task.Deadline = updatedTask.Deadline;

    await db.SaveChangesAsync();
    return Results.NoContent();
})
.WithName("UpdateTask")
.WithOpenApi();

app.Run();
