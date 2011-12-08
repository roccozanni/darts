var express = require('express');

module.exports =
{
    configure: function(app)
    {
        app.configure(function(){
            app.set('views', __dirname + '/../views');
            app.set('view engine', 'jade');
            app.set('view options', { layout: false });
            app.use(express.bodyParser());
            app.use(express.methodOverride());
            app.use(express.static(__dirname + '/../../public'));
            app.use(app.router);
        });

        app.configure('development', function() {
            app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
        });

        app.configure('production', function() {
            app.use(express.errorHandler()); 
        });
    },

    handle: function(app)
    {
        app.get('/', function (req, res) {
            res.render('index');
        });   
    }
}