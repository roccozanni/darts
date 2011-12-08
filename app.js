var app     = require('express').createServer();
var io      = require('socket.io').listen(app);
var routes  = require('./src/handlers/routes.js');
var sockets = require('./src/handlers/sockets.js');

// Configuration
routes.configure(app);
sockets.configure(io);

// Handle requests
routes.handle(app);
sockets.handle(io);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});