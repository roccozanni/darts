
module.exports = function(emitter, players, limit)
{
    var scores = {};
    var player = null;

    for (var i = 0; i < players.length; i++) {
        scores[players[i]] = 0;
    }

    emitter('game.created', { type: 'up', players: players, limit: limit });
    emitter('game.scores', scores);

    return {

        setPlayer: function(p)
        {
            if (scores[p] === undefined) { return; }

            player = p;
            emitter('player.change', player);
        },

        addScore: function(score, multiplier)
        {
            if (!player) { return; }

            scores[player] += (score * multiplier);
            emitter('game.scores', scores);

            if (scores[player] < limit) {
                return;
            }

            emitter('game.finished', { winner: player });
        }
        
    };
}