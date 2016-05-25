var cluster = require('cluster');
var http = require('http');


var numCPUs = 4;
if (cluster.isMaster) { //er du master?
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork(); //hvis ja, uddeligeres en tråd af masteren.
    }
} else { //hvis nej, er du en "worker", og en server startes til dig.
    http.createServer(function (req, res) {
        res.writeHead(200);
        res.end('process ' + process.pid + ' says hello!');
    }).listen(3000);
}

//Skal ligge inde i bin/www

//Documentation
//https://github.com/LearnBoost/cluster