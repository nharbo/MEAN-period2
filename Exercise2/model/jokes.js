//array med jokes..
var jokes = [
    "A day without sunshine is like, night.",
    "At what age is it appropriate to tell my dog that he's adopted?",
    "I intend to live forever, or die trying"
];

function _getRandomJoke() {
    return jokes[Math.floor(Math.random() * jokes.length)];
}

function _addJoke(joke) {
    jokes.push(joke);
}

function _editJoke(oldJoke, newJoke) {
    var index = jokes.indexOf(oldJoke);
    if (jokes.index !== -1) {
        jokes[index] = newJoke;
        console.log("Joke edited!");
    }
}

function _deleteJoke(jokeToDelete) {
    var index = jokes.indexOf(jokeToDelete);
    if (jokes.index !== -1) {
        jokes.splice(index, 1);
        console.log("Joke deleted!")
    }
}

//Dette fungerer som en facade
module.exports = {
    allJokes: jokes,
    getRandomJoke: _getRandomJoke,
    addJoke: _addJoke,
    editJoke: _editJoke,
    deleteJoke: _deleteJoke
};