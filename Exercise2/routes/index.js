var express = require('express');
var router = express.Router();

var jokes = require('../model/jokes');

//var allJokesCounter = 0;
//var randomJokeCounter = 0;
//var storeNewJokeCounter = 0;

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Joke-Express', username: req.session.userName, allJokesCount: req.session.allJokesCount, randomJokeCount: req.session.randomJokeCount, storeNewJokeCount: req.session.storeNewJokeCount});
});

router.get('/jokes', function(req, res, next) {
    if(req.session.allJokesCount){ //Her tælles hvor mange gange brugeren har set "all jokes" - gemmes i session - DETTE ER ULOVLIGT
        req.session.allJokesCount++;
    } else {
        req.session.allJokesCount = 1;
    }
  res.render('jokes', { jokes: jokes.allJokes});
});

router.get('/joke', function(req, res, next) {

    if(req.session.randomJokeCount){
        req.session.randomJokeCount++;
    } else {
        req.session.randomJokeCount = 1;
    }
  res.render('joke', { joke: jokes.getRandomJoke()});
});

router.get('/addnewjoke', function(req, res, next) {
 res.render('addnewjoke');
});

router.post('/storejoke', function(req, res, next) { //Der skal laves en url som kaldes fra formen, når noget skal gemmes..
  var joke = req.body.joke;
  jokes.addJoke(joke);
    if(req.session.storeNewJokeCount){
        req.session.storeNewJokeCount++;
    } else {
        req.session.storeNewJokeCount = 1;
    }
  res.redirect('/addnewjoke');
});

//Der skal exportes, før man kan require denne side i app.js :-)
module.exports = router;
