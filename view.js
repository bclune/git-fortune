var escape = require('escape-html');


function writeMessage(messageText, response) {
    var message = '' + 
        '<!DOCTYPE HTML><html><head>' +
        '<link rel="stylesheet" type="text/css" href="/fortune.css"/>' +
        '</head>' +
        '<body>'+
        '<a href="https://github.com/bclune/git-fortune">' + 
        '<img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" alt="Fork me on GitHub"></a>' +
        '<div class="message">' +
        escape(messageText) +
        '</div></body></html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(message);
    response.end();
}

function writeNotFound(response) {
    var message = '<html><body><h1>404 File Not Found</h1></body><html>';
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write(message);
    response.end();

}

exports.writeMessage = writeMessage;
exports.writeNotFound = writeNotFound;
