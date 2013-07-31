var fortunes = require('./fortunes');
var RANDOM_REPOSITORY = '/twbs/bootstrap';

function displayRandomMessage(pathname, response) {
    console.log('Request handler \'displayRandomMessage\' was called.');
    fortunes.displayMessage(RANDOM_REPOSITORY, response);
}

function displayMessage(pathname, response) {
    console.log('Request handler \'displayMessage\' was called.');
    //TODO: pathname logic and sanitization
    fortunes.displayMessage(pathname, response);
}

function displayResource(pathname, response) {
    console.log('Request handler \'displayResource\' was called.');
    //TODO: serve resource
}

exports.displayRandomMessage = displayRandomMessage;
exports.displayMessage = displayMessage;
exports.displayResource = displayResource;
