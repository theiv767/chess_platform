const EnumColor = require('./EnumColor');
const chessBoard = require('./ChessBoard');

class Piece{
    constructor(color, row, col){
        this._color = color
        this._row = row
        this._col = col
        this._chessBoard;
        this._eliminated = false
        this._selected = false
        this._canCastle = false
    }

    
    checkMoviment(row, col, chessBoard){
        //override this method;
    }

    get color() {
        return this._color;
    }

    get row() {
        return this._row;
    }

    get col() {
        return this._col;
    }

    get chessBoard(){
        return this._chessBoard
    }

    get eliminated() {
        return this._eliminated;
    }

    get selected() {
        return this._selected;
    }

    get canCastle(){
        return this._canCastle;
    }

    set color(color) {
        this._color = color;
    }

    set row(row) {
        this._row = row;
    }

    set col(col) {
        this._col = col;
    }

    set chessBoard(chessBoard){
        this._chessBoard = chessBoard
    }

    set eliminated(eliminated) {
        this._eliminated = eliminated;
    }

    set selected(select) {
        this._selected = select;
    }

    set canCastle(canCastleValue){
        this._canCastle = canCastleValue;
    }

}

module.exports = Piece;