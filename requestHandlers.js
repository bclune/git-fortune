var fortunes = require('./fortunes');
var RANDOM_REPOSITORY = '/bclune/git-fortune';

function displayRandomMessage(response) {
    console.log('Request handler \'displayRandomMessage\' was called.');
    fortunes.displayMessage(RANDOM_REPOSITORY, response);

}
function displayResource(response) {
    console.log('Request handler \'displayResource\' was called.');
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('hello resource');
    response.end();
}

exports.displayRandomMessage = displayRandomMessage;
exports.displayResource = displayResource;
