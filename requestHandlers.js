var fortunes = require('./fortunes'),
    view = require('./view'),
    path = require('path'),
    fs = require('fs');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};
var RANDOM_REPOSITORY = '/git-fortune/fortunes';


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
    var filename = path.join(process.cwd(), pathname);
    path.exists(filename, function(exists) {
        if(!exists) {
            view.writeNotFound(response);    
            return;
        }
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        console.log(mimeType);
        response.writeHead(200,{'Content-Type': mimeType});
        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(response);
    });
}

exports.displayRandomMessage = displayRandomMessage;
exports.displayMessage = displayMessage;
exports.displayResource = displayResource;
