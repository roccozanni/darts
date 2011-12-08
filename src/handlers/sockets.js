var game_up         = require('../games/up.js');
var game_clock      = require('../games/clock.js');
var game_cricket    = require('../games/cricket.js');

module.exports =
{
    configure: function(io)
    {
        io.configure(function(){
            io.set('log level', 1);
        });
    },

    handle: function(io)
    {
        var game    = null;

        io.sockets.on('connection', function (socket) {

            //TODO MERDAZZA
            function emitter(name, body)
            {
                socket.emit(name, body);
                socket.broadcast.emit(name, body);
            };

            // Create new game
            socket.on('game.create', function (data)
            {
                switch(data.type)
                {
                    case 'up':
                        game = new game_up(emitter, data.players || [], data.limit || 301);
                        break;
                    case 'clock':
                        game = new game_clock(emitter, data.players || [], data.limit || 10);
                        break;
                    case 'cricket':
                        game = new game_cricket(emitter, data.players || [], data.limit || 15);
                        break;
                    default: 
                        break;
                }

                if (!game) { return; }
            });

            // Add a new player
            socket.on('player.set', function (data)
            {
                if (!game) { return; }
                game.setPlayer(data);
            });

            // Submit score
            socket.on('score.add', function (data)
            {    
                if (!game) { return; }
                game.addScore(data.value || 0, data.multiplier || 1);
            });
        });        
    }
}