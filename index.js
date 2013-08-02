var port = 8080;
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};

handle["/"] = requestHandlers.displayRandomMessage;
handle["/favicon.ico"] = requestHandlers.displayResource;
handle["/fortune.css"] = requestHandlers.displayResource;
handle._default = requestHandlers.displayMessage;

server.start(port, router.route, handle);
