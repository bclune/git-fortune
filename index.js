var port = 8080;
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};

handle["/"] = requestHandlers.displayRandomMessage;

server.start(port, router.route, handle);
