function add(n1, n2) {
    return n1 + n2;
}

function addAsync(n1, n2, callback) {
    setTimeout(function () {
        var result = n1 + n2;

        console.log("In timer function");

        callback(result);
    }, 1000); //agerer som asynkronitet.
}

module.exports.add = add;
module.exports.addAsync = addAsync;  