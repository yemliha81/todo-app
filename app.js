const env = "production";
let db = "localhost";
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const { Client } = require('pg');
if(env == "dev"){
    db = 'localhost';
}else{
    db = 'db';
}
const connectionString = 'postgres://postgres:postgres@'+db+':5432/nodejs'
const client = new Client({
    connectionString: connectionString
});
client.connect();
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.append('Access-Control-Allow-Origin', ['*']);
    response.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/', function (req, res, next) {
    //res.status(200).send("It works!");
    sql =" CREATE TABLE IF NOT EXISTS public.todos ( id SERIAL, task character varying(100), priority character varying(100), taskdate character varying(100)  );";
    
    client.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send("To do list API works...");
    });
});

app.get('/gettodolist', function (req, res, next) {

    client.query('SELECT * FROM todos order by id DESC', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});

app.post('/addTask', function (req, res, next) {
   
    const sql = 'INSERT INTO todos(task, priority, taskdate) VALUES($1, $2, $3) RETURNING *'
    const task = req.body.task;
    const priority = req.body.priority;
    const taskdate = req.body.taskdate;
    const values = [task, priority, taskdate]

    client.query(sql, values, (err, results) => {
        if (err) {
          console.log(err.stack)
        } else {
            res.status(200).send("ok");
        }
      })
});

app.post('/updateTask', function (req, res, next) {
   
    const sql = 'UPDATE todos SET priority = $2 WHERE id = $1'
    const id = req.body.id;
    const priority = req.body.priority;
    const values = [id, priority]

    client.query(sql, values, (err, results) => {
        if (err) {
          console.log(err.stack)
        } else {
            res.status(200).send("ok");
        }
      })
});


app.get('/delTask/:id', function (req, res, next) {
    const id = req.params.id
    const query = 'DELETE FROM todos WHERE id = '+id;
    client.query(query, function(err, results){
        if (err) {
            console.log(err.stack)
          } else {
            res.status(200).send("ok");
        }
    });
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});


module.exports = app