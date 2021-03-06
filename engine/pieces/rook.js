var master;
var Piece = require("./piece.js");
var Space = require("../space.js");
var Chessboard = require("../chessboard.js");
var utils = require("../utils.js");
var Vector = require("../vector.js");

var _ = require("underscore");

module.exports = {
    init : function (pieceConfigs){
        var Base = Piece.init(pieceConfigs);
        return function (team, isRoyal){
            master = require('../master.js');
            this.__proto__ = new Base(team, isRoyal);
            this.getMoves = getMoves;
        }
    }, 

    loadJSONObj : Piece.loadJSONObj
};


function getMoves(board, space){
    var CastleMove = master.getMove('castle');

    var moves = this.__proto__.getMoves(board,space);
    var royalSpace = Chessboard.getRoyalSpace(board, this.getTeam(Space.getPiece(space)));
    if(this.getMoveCount(Space.getPiece(space)) === 0 && this.getMoveCount(Space.getPiece(space)) === 0){
        var move = _.find(moves, adjacentMoveFilter(board, royalSpace));
        
        if(utils.existy(move)){
            moves.push(new CastleMove({
                team : move.getTeam(), 
                loc : move.getLoc(), 
                vec : move.getVec(), 
                step : move.getStep(), 
                capturedPiece : move.getCapturedPiece()
            }));
        }
    }
    return moves;
}

function adjacentMoveFilter(board, targetSpace){
    return function(move){
        return  Vector.isEqual(
                    Space.getLoc(Chessboard.getSpace(board, Vector.subtract(Space.getLoc(targetSpace), Vector.create(1,0)))), 
                    move.getEndLoc()
                ) ||
                Vector.isEqual(
                    Space.getLoc(Chessboard.getSpace(board, Vector.add(Space.getLoc(targetSpace), Vector.create(1,0)))), 
                    move.getEndLoc()
                );
    }  ; 
}
