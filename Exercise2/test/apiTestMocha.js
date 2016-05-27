var request = require("request");
var expect = require("chai").expect; //Mocha = framework, chai er et bibliotek til mocha, som gør vi kan bruge eksempslvis expect.
var http = require("http");
var nock = require('nock'); //Bruges til at mocke

var server;
var TEST_PORT = 3456;

//Nedenstående skal køres med mocha i terminalen..

//Vi laver en "testserver" med sin egen port.
var n = nock("http://localhost:" + TEST_PORT);

before(function (done) {

    var app = require('../app');

    server = http.createServer(app);
    server.listen(TEST_PORT, function () {
        done();
    });

});

//Serveren lukkes efter testen.
after(function (done) {
    server.close();
    done();
});


//Her testes på det "rigtige" api - ingen mocking.

//GET
describe("Testing actual API ", function () {

    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/jokes",
        method: "GET"
    };

    it("Should get all jokes", function (done) {

        request(options, function (error, res, body) {

            var jokes = JSON.parse(body);

            expect(jokes.length).to.be.equal(3); //Vi ved at der ligger 3 jokes i vores model/jokes.js, som returneres af vores jokeApi.
            done();
        });
    });
});

//POST
describe("Testing actual API ", function () {

    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/joke",
        method: "POST",
        json: true,
        body: {joke: "This is a new joke!"}
    };

    it("Should add a new joke", function (done) {

        request(options, function (error, res, body) {

            var joke = body;

            expect(joke).to.be.equal("This is a new joke!");
            done();
        });
    });
});

//PUT
describe("Testing actual API ", function () {

    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/editJoke",
        method: "PUT",
        json: true,
        body: {newJoke: "I am changed!", oldJoke: "I intend to live forever, or die trying"}
    };

    it("Should edit a joke", function (done) {

        request(options, function (error, res, body) {

            var jokes = body;

            expect(jokes).to.contains("I am changed!");
            done();
        });
    });
});

//DELETE
describe("Testing actual API ", function () {

    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/delete",
        method: "DELETE",
        json: true,
        body: {jokeToDelete: "A day without sunshine is like, night."}
    };

    it("Should delete a joke", function (done) {

        request(options, function (error, res, body) {

            var jokes = body;

            expect(jokes).to.not.contains("A day without sunshine is like, night.");
            done();
        });
    });
});


//Mock via nock, for at få en random joke. !!HTTP-mocking!!
describe("Testing API  with Mocks", function () {

    // We mock the api call so that we can controll the return value.
    before(function (done) {
        n.get("/api/random").reply(200, "I am a joke"); //Vi forudbestemmer vores response.
        done();
    });

    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/random",
        method: "GET"
    };


    it("Should get a joke as string", function (done) {

        request(options, function (error, res, body) {

            var joke = body;

            expect(joke).to.be.equal("I am a joke"); //Matcher vores forud bestemte response.
            done();
        });
    });
});


//Test af asynkron kode
var adder = require("../model/calc.js");

describe("Test calculator", function () {
    it("should return 4", function () {
        expect(adder.add(2, 2)).to.be.equal(4);
    });

    it("should return 6 asynchronously", function (done) {
        adder.addAsync(3, 3, function (res) { //res = callback
            expect(res).to.be.equal(6);
            done();
        })
    });
});
