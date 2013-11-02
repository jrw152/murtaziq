
var vector = require("./vector.js");
var colors = require("colors");
var _ = require("underscore");
var Match = require("./match.js");
var match;

module.exports = {
    getMatch : getMatch,
    vector : vector,
    getMoves : getMoves,
    move : move
};

    
match = Match.create();

move(0,1,0,3);
move(0,6,0,4);





function getMatch () {
    return match;
}

function getMoves(x, y){
    console.log("\nMoves at " + vector.toString(vector.create(x,y)));
    var moves = Match.getMoves(match, vector.create(x, y), undefined, true);
    Match.printBoard(
        match,
        {
            positions : _.map(moves, function(m){
                return m.getEndLoc();
            }),
            color : 'green'
        },
        {
            positions : [
                vector.create(x,y)
            ],
            color : 'yellow'
        }
    );
}

function move(x1, y1, x2, y2){
    console.log("\nMove: " + vector.toString(vector.create(x1,y1)) + " -> " + vector.toString(vector.create(x2,y2)));
    Match.printBoard(Match.move(match, vector.create(x1, y1), vector.create(x2,y2), match.turn).data);
}
