var express = require('express');
var api = express.Router();
var jokes = require('../model/jokes');

api.get('/api/jokes', function (req, res, next) {
    return res.json(jokes.allJokes);
});

api.get('/api/joke/random', function (req, res, next) { //Route-middleware.
    return res.json(jokes.getRandomJoke());
});

api.post('/api/joke', function (req, res, next) {
    var joke = req.body.joke;
    jokes.addJoke(joke);
    res.json(joke);
});

api.put('/api/editJoke/', function (req, res) {
    var newJoke = req.body.newJoke;
    var oldJoke = req.body.oldJoke;
    console.log("--new joke-- " + newJoke);
    jokes.editJoke(oldJoke, newJoke);
    res.json(newJoke);
});

api.delete('/api/delete/', function (req, res) {
    var jokeToDelete = req.body.jokeToDelete;
    jokes.deleteJoke(jokeToDelete);
    res.json(jokes.allJokes);
});

//Der skal exportes, før man kan require denne side i app.js :-)
module.exports = api;