
module.exports = function(emitter, players, limit)
{
    var scores = {};
    var player = null;

    for (var i = 0; i < players.length; i++) {
        scores[players[i]] = 0;
    }

    emitter('game.created', { type: 'clock', players: players, limit: limit });
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
            if (scores[player] !== score - 1) { return; }

            scores[player] += 1;
            emitter('game.scores', scores);

            if (scores[player] < limit) {
                return;
            }

            emitter('game.finished', { winner: player });
        }
        
    };
}