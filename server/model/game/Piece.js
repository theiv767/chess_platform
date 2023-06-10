class Piece{
    constructor(color, row, col, srcImage ){
        this._color = color
        this._row = row
        this._col = col
        this._srcImage = srcImage
        this._chessBoard;
        this._eliminated = false
        this._selected = false
        this._canCastle = false
    }

    
    checkMoviment(row, col){
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

    get srcImage() {
        return this._srcImage;
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

    set srcImage(image) {
        this._image = image;
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