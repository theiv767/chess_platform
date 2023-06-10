// GRASP PURE FABRICATION

class SelectedPiece {
    SelectedPiece(row, col, piece){
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