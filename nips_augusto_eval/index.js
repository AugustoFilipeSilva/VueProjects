var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');

var app = express();
var cors = require('cors');
var server = http.createServer(app);
var db = new sqlite3.Database('./activities.db');

db.run('CREATE TABLE IF NOT EXISTS activities(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, description TEXT NOT NULL, done INTEGER NOT NULL DEFAULT 0)');

app.use(cors())

// CREATE
app.get('/add/:description', function(req,res){
  db.serialize(()=>{
    db.run('INSERT INTO activities(description) VALUES(?)', [req.params.description], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("New activity has been added");
      res.send("New Activity has been added into the database with Description = "+req.params.description);
    });
  });
});

// READ SINGLE ENTRY
app.get('/view/:id', cors(), function(req,res){
  db.serialize(()=>{
    db.each('SELECT id ID, description DESCRIPTION, done DONE from activities WHERE id =?', [req.params.id], function(err,row){     //db.each() is only one which is funtioning while reading data from the DB
      if(err){
        res.send("Error encountered while dislaying");
        return console.error(err.message);
      }
      res.json(row);
      console.log("Entry displayed successfully");
    });
  });
});

// READ ALL
app.get('/view/', function(req,res){
  db.serialize(()=>{
    db.all('SELECT * FROM activities', function(err,row){
      if(err){
        res.send("Error encountered while dislaying");
        return console.error(err.message);
      }
      res.json(row);
      console.log("Entry displayed successfully");
    });
  });
});

//UPDATE
app.get('/update/:id/:description', function(req,res){
  db.serialize(()=>{
    db.run('UPDATE activities SET description = ? WHERE id = ?', [req.params.description,req.params.id], function(err){
      if(err){
        res.send("Error encountered while updating");
        return console.error(err.message);
      }
      res.send("Entry updated successfully");
      console.log("Entry updated successfully");
    });
  });
});

//START / FINISH ACTIVITY
app.get('/finish/:id', function(req,res){
  db.all('SELECT done FROM activities where id =?',[req.params.id], function(err,row){
    if(err){
      res.send("Error encountered while dislaying");
      return console.error(err.message);
    }
    db.run('UPDATE activities SET done = ? WHERE id = ?', [(row[0].done ==1? 0:1),req.params.id], function(err){
      if(err){
        res.send("Error encountered while updating");
        return console.error(err.message);
      }
      res.send("Entry updated successfully");
      console.log("Entry updated successfully");
    });
    console.log("Entry displayed successfully");
  });
});

// DELETE
app.get('/del/:id', function(req,res){
  db.serialize(()=>{
    db.run('DELETE FROM activities WHERE id = ?', req.params.id, function(err) {
      if (err) {
        res.send("Error encountered while deleting");
        return console.error(err.message);
      }
      res.send("Entry deleted");
      console.log("Entry deleted");
    });
  });
});

// Closing the database connection.
app.get('/close', function(req,res){
  db.close((err) => {
    if (err) {
      res.send('There is some error in closing the database');
      return console.error(err.message);
    }
    console.log('Closing the database connection.');
    res.send('Database connection successfully closed');
  });
});

server.listen(3000, function(){
  console.log("server is listening on port: 3000");
});
