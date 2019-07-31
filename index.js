'use strict'
const data = require("./data")
const express = require("express");
const bodyParser = require("body-parser")
const app = express();

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
res.render('home'); 
});

 //send plain text response
 app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('/about ' + req.query.name+ '/');
 });

// handle form submission
app.post('/detail', (req, res) => {
  console.log(req.body)
  let result = data.getitem(req.body.make)
  res.render('detail', {make: req.body.make, car: result});
 });

 app.get('/delete', (req, res) => {
  
  res.render('delete', {make: req.query.make});
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