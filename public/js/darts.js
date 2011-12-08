var multiplier  = 1;
var socket      = null;
var game        = null;
var limit       = null;

function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createGameUp(limit) {
    socket.emit('game.create', { type: 'up', limit: limit, players: [
        'Rocco', 'Marco', 'Alex'
    ]});
}

function createGameClock(limit) {
    socket.emit('game.create', { type: 'clock', limit: limit, players: [
        'Rocco', 'Marco', 'Alex'
    ]});
}

function createGameCricket(limit) {
    socket.emit('game.create', { type: 'cricket', limit: limit, players: [
        'Rocco', 'Marco', 'Alex'
    ]});
}

function setPlayer(name) {
    socket.emit('player.set', name);
}

function setMultiplier(value) {
    multiplier = value;   
}

function submitScore(value) {
    socket.emit('score.add', { value: value, multiplier: multiplier });
    multiplier = 1;
}

function formatScoreNumber(value) {
    return value >= limit ? "WINNER" : value;
}

function formatScoreCricket(value) {
    var result = [];
    $.each(value, function(number, remaining) { 
        if (remaining === 0) { return; }
        result.push(number + "x" + remaining);
    });

    return result.length === 0 ? "WINNER" : result.join(" ");
}

$(document).ready(function() {

    // Connect to the backend server
    socket = io.connect('http://' + document.location.host );

    // A game was created
    socket.on('game.created', function (data) {
        game  = data.type;
        limit = data.limit; 
        $('#current_game').html(ucfirst(data.type));
        $('.current_player').html("None");
        $.mobile.changePage($("#scores"));
    });

    // Current player change
    socket.on('player.change', function (data) {
        $('.current_player').html(data);
    });

    // Score update
    socket.on('game.scores', function (data) {
        $.each(data, function(player, score) { 
            $('#score_' + player).html(game !== 'cricket' ?  formatScoreNumber(score) : formatScoreCricket(score));
        });
    });

    // Game finished
    socket.on('game.finished', function (data) {
        $('.ui-dialog').dialog('close');
    });
});