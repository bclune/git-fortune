var port = 8080;
var server = require("./server");
var router = require("./router");

server.start(router.route, port);
