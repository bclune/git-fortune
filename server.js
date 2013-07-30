var http = require("http");
var url = require("url");


function start(route, port) {
    function onRequest(request, response) {
        console.log(url.parse(request.url));
        var pathname = url.parse(request.url).pathname;
        route(pathname);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello! World.");
        response.end();
    }

    http.createServer(onRequest).listen(port);
    console.log("Started server on port " + port);
}

exports.start = start;
