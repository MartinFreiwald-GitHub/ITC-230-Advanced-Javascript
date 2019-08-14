'use strict'
const data = require("./data")
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const Car = require("./models/cars");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

const handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname:'.html', defaultLayout: false}));
app.set("view engine", ".html");

// // send static file as response
// app.get('/', (req, res) => {
//   console.log(req.query);
//   res.type('text/html');
//   res.sendFile(__dirname + '/public/home2.html'); 
//  });

app.get('/', (req, res) => {
  Car.find({}, (err, result) => {

    if (err) {
        console.log(err);
    } else {
      res.render('home', {cars: result}); 
        console.log(result);
    }
});

});

app.get('/api/cars', (req, res) => {
  Car.find({}, (err, result) => {

    if (err) {
        console.log(err);
    } else {
      res.json(result); 
        console.log(result);
    }
});

});

 //send plain text response
 app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('/about ' + req.query.name+ '/');
 });

// handle form submission
app.post('/detail', (req, res) => {
  
  Car.find({'make':req.body.make}, (err, result) => {

    if (err) {
        console.log(err);
    } else {
      res.render('detail', {make: req.body.make, car: result}); 
        console.log(result);
    }
});
 });

 app.get('/api/detail/:make', (req, res) => {
  console.log(req.params)
  Car.findOne({'make':req.params.make}, (err, result) => {
    console.log(err)
    console.log(result)
    if (err || ! result) {
        console.log(err);
        return res.status(404).send('Not Found here');
    } else {
      res.json(result); 

    }
});
 });

 app.get('/delete', (req, res) => {
  
  res.render('delete', {make: req.query.make});
 });

 app.get('/api/delete/:make', (req, res) => {
  Car.remove({'make':req.params.make}, (err, result) => {
    console.log(err)
    console.log(result)
    if (err) {
        console.log(err);
    } else {
      res.json(result); 
    }
   });
 });

 app.post('/api/add', (req, res) => {
  console.log(req.body)
  Car.updateOne({'make':req.body.make}, req.body, {upsert:true}, (err, result) => {
    if (err) return next(err);
    console.log(result);
    res.json(result)
  }); 
 });

// define 303 handler
app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(303);
  res.send('303 - Temporty Redirection TO: DELETE /file.html HTTP/1.1 ');
 });

// define 404 handler
app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
 });


 app.listen(app.get('port'), () => {
  console.log('Express started at ' + __dirname); 
 });

// const fs = require("fs");
// http.createServer((req,res) => {
//   const path = req.url.toLowerCase();
//   switch(path) {
//     case '/':
//       fs.readFile("file:///C:/Users/Martin%20Freiwald/Desktop/itc230/home.html", (err, data) => {
//       if (err) return console.error(err);
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end(data.toString());
//         });
//         break; 
//     case '/about':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('About page');
//       break;
//     default:
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.end('Not found');
//       break;
//     }
// }).listen(process.env.PORT || 3000, function() {
//   console.log('Server started on port: 3000/');
// });