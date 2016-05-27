var cluster = require('cluster');
var http = require('http');


var numCPUs = 4;

if (cluster.isMaster) { //er du master? - dette sker første gang serveren køres.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork(); //hvis ja, spawnes det antal "servers" som der er CPU'er.
    }
} else { //hvis nej, er du en "worker" (cluster.isWorker), og en server startes til dig.
    http.createServer(function (req, res) {
        res.writeHead(200);
        res.end('process ' + process.pid + ' says hello!');
    }).listen(3000);
}

//Skal ligge inde i bin/www

//Loadbalancer styrer hvilken server der bliver brugt.

//Documentation
//https://github.com/LearnBoost/cluster