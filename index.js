var express = require("express");
var app = express();
var path = require("path");

var Sequelize = require("sequelize");
var sql = new Sequelize("postgres://robertthomas:a:5432/do_something");

var List = sql.define("List", {
  title: Sequelize.STRING
});

app.use("/app", express.static(path.join(__dirname + "/app")));

app.get("/", function(request, response){
  response.sendFile(__dirname + "/app/views/index.html");
});

app.get("/lists", function(request, response){
  sql.sync().then(function(){
    return List.create({
      title: "Hello"
    });
  }).then(function(list){
    list.get({plain: true})
  });
});

app.post("/lists", function(request, response){
  // Create new list
});

app.get("/lists/:id", function(request, response){
  // Show list
});

app.patch("/lists/:id", function(requst, response){
  // Update list
});

app.delete("/lists/:id", function(request, response){
  // Delete list
});

app.post("/lists/:id/tasks", function(request, response){
  // Create task
});

app.get("/lists/:id/tasks/:task_id", function(request, response){
  // Get task
});

app.patch("/lists/:id/tasks/:task_id", function(request, response){
  // Update task
});

app.delete("/lists/:id/tasks/:task_id", function(request, response){
  // Delete task
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});