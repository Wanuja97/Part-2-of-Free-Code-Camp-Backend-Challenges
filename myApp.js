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

//Implement a Root - Level Request Logger MiddlewarePassed
app.use(function (req, res, next) {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next()
});























 module.exports = app;
