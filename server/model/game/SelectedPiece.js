// GRASP PURE FABRICATION
const Piece = require('./Piece')
const Bishop = require('./pieces/Bishop.js');
const Knight = require('./pieces/Knight.js');
const Rook = require('./pieces/Rook.js');
const Queen = require('./pieces/Queen.js');
const King = require('./pieces/King.js');
const Pawn = require('./pieces/Pawn.js');

class SelectedPiece {
    constructor(row, col, piece){
        this._row = row;
        this._col = col;
        this._piece = piece;
    }

    get piece() {
        return this._piece;
    }

     get row() {
        return this._row;
    }

     get col() {
        return this._col;
    }

     set piece(piece) {
        this._piece = piece;
    }

     set row(row) {
        this._row = row;
    }

     set col(col) {
        this._col = col;
    }
}

module.exports = SelectedPiece;