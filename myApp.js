var express = require('express');
var app = express();
console.log("Hello World");

const dotenv = require("dotenv")

dotenv.config();

// app.get('/', function (req, res) {
//     res.send('Hello Express');
// });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// Normal usage
app.use('/public', express.static('public'))


app.get("/json", (req, res) => {
    res.json({
        message: "Hello json"
    });
});
// updating .env variables in aroute
app.get("/json", (req, res) => {
    const mySecret = process.env.MESSAGE_STYLE;
    var message = { "message": "Hello json" };
    if (mySecret == "uppercase") {
        message = { "message": "HELLO JSON" };
    }
    res.json(message);
});

//Implement a Root - Level Request Logger Middleware
app.use(function (req, res, next) {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next()
});

// Get Route Parameter Input from the Client
app.get('/:word/echo',(req,res)=>{
  const myword = req.params.word;
  res.json(
    {
      echo : myword
    }
  )
});

// Get Query Parameter Input from the Client
app.route('/name').get((req, res) => {
  const { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
}).post((req, res) => {
  const { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

// parameter passing way
// https://boilerplate-express-forked.wanujaranasingh.repl.co/name?first=Wanuja&last=Ranasinghe

//body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser());

// Get data from post request
app.route('/name').get((req, res) => {
  const { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
}).post((req, res) => {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});












 module.exports = app;
