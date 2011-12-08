
module.exports = function(emitter, players, limit)
{
    var scores = {};
    var player = null;

    for (var i = 0; i < players.length; i++) {
        scores[players[i]] = { 25: 3 };

        for (var y = limit; y <= 20; y++) {
            scores[players[i]][y] = 3;
        }
    }

    emitter('game.created', { type: 'cricket', players: players, limit: limit });
    emitter('game.scores', scores);

    return {

        setPlayer: function(p)
        {
            if (scores[p] === undefined) { return; }

            player = p;
            emitter('player.change', p);
        },

        addScore: function(score, multiplier)
        {
            if (!player) { return; }
            if (scores[player] === undefined ) { return; }
            if (!scores[player][score]) { return; }

            scores[player][score] -= multiplier;
            emitter('game.scores', scores);

            var winner = true;
            for (var num in scores[player]) {
                if (scores[player][num] !== 0) {
                    winner = false;
                    break;
                }
            }

            if (!winner) {
                return;
            }

            emitter('game.finished', { winner: player });
        }
        
    };
}