function writeMessage(messageText, response) {
    var message = '<html><body><pre>' + messageText + '</pre></body><html>';

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
