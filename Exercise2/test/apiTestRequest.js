var request = require("request"); //Bruges til at kunne lave posts


//--GET--

request('http://localhost:3000/api/jokes', function (error, response, body) {
    console.log("--GET--");
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});

//--POST--

//Start serveren, og kør denne fil

var options = {
    url: "http://localhost:3000/api/joke",
    method: "POST",
    json: true,
    body: {
        joke: "I'm a new joke"
    }
};

request(options, function (error, res, body) {
    console.log("--POST--");
    if (!error && res.statusCode == 200) {
        console.log("BODY: " + body); //Giver responset tilbage fra vores jokeApi.
    } else {
        console.log("ERROR: " + error)
    }
});


//--PUT--

var options = {
    url: "http://localhost:3000/api/editJoke/",
    method: "PUT",
    json: true,
    body: {
        oldJoke: "I intend to live forever, or die trying",
        newJoke: "this joke is changed!"
    }
};

request(options, function (error, res, body) {
    console.log("--PUT--");
    if (!error && res.statusCode == 200) {
        console.log("BODY: " + body); //Giver responset tilbage fra vores jokeApi.
    } else {
        console.log("ERROR: " + error)
    }
});


//--DELETE--

var options = {
    url: "http://localhost:3000/api/delete",
    method: "DELETE",
    json: true,
    body: {
        jokeToDelete: "A day without sunshine is like, night."
    }
};

request(options, function (error, res, body) {
    console.log("--DELETE--");
    if (!error && res.statusCode == 200) {
        console.log("BODY: " + body); //Giver responset tilbage fra vores jokeApi.
    } else {
        console.log("ERROR: " + error)
    }
});