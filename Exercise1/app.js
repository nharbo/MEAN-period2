
var express = require('express');
var app = express();
var bodyParser = require("body-parser");


//----Middleware---
app.use(bodyParser.urlencoded({extended: false}));
app.use("/api/calculator/:operation/:n1/:n2", function(req, res, next){ //parameters - kan fanges på req.params.xxxx når "body-parser" middleware bliver inkluderet.
    var calculatorRequest = { //Der laves et nyt objekt af et request
        operation : req.params.operation,
        n1 : Number (req.params.n1),
        n2 : Number (req.params.n2)
    };

    res.calc = calculatorRequest; //Objektet sættes på response -objektet
    next(); //Sender det videre i "middleware-chain"
});

//Route-handler
app.get("/api/calculator/*", function(req, res){

    var result = getResult(res.calc.operation, res.calc.n1, res.calc.n2);

    res.send("Result of your calculation: " + result);

});


function getResult(operation, n1, n2) {
    if (operation === 'add') {
        return n1 + n2;
    } else if (operation === 'subtract') {
        return n1 - n2;
    } else if (operation === 'divide') {
        return n1 / n2;
    } else if (operation === 'multiply') {
        return n1 * n2;
    }
}

//----Middleware ends----

app.listen(3000, function(){
    console.log("listening on port " + 3000);
});


