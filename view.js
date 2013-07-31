function writeMessage(messageText, response) {
    var message = '<html><body><pre>' + messageText + '</pre></body><html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(message);
    response.end();
}

exports.writeMessage = writeMessage;
