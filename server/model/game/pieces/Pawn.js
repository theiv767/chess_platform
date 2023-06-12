const Piece = require('../Piece.js')
const EnumColor = require('../EnumColor.js')

class Pawn extends Piece {

    constructor(color, row, col) {
        super(color, row, col);
    }
    
    checkMoviment(row, col, chessBoard) {
        if(chessBoard.turn != chessBoard.selectedPiece.piece.color){
            return "false";
        }
        if(this.col == col && this.row == row){
            return "false";
        }

        if (this.color == EnumColor.WHITE) {
            if (this.row == 1) { // primeiro lançe que pode ser de uma ou duas casas
                if ((row == 2 || row == 3) && (col == this.col)) {
                    console.log("testeee", "defalt");
                    return "DEFAULT";
                }else
                    return "false";

            } else {
                if ((row == this.row + 1) && (col == this.col)) {
                    if (chessBoard.getPiece(row, col) == null) {
                        console.log("testeee", "defalt");
                        return "DEFAULT";
                    }
                }
                if (row == this.row + 1 && (col == this.col + 1 || col == this.col - 1)) {
                    if (chessBoard.getPiece(row, col) == null)
                        return "false";
                    if (chessBoard.getPiece(row, col).color == EnumColor.DARK) {
                        console.log("testeee", "capture");
                        return "CAPTURE";
                    }
                }
                return "false";
            }
        } else { //lances das pretas
            if (this.row == 6) { // primeiro lançe que pode ser de uma ou duas casas
                if ((row == 5 || row == 4) && (col == this.col)) {
                    console.log("testeee", "defalt");
                    return "DEFAULT";
                }else
                    return "false";

            } else {
                if ((row == this.row - 1) && (col == this.col)) {
                    if (chessBoard.getPiece(row, col) == null) {
                        console.log("testeee", "defalt");
                        return "DEFAULT";
                    }
                }
                if (row == this.row - 1 && (col == this.col + 1 || col == this.col - 1)) {
                    if (chessBoard.getPiece(row, col) == null)
                        return "false";
                    if (chessBoard.getPiece(row, col).color == EnumColor.WHITE) {
                        console.log("testeee", "capture");
                        return "CAPTURE";
                    }
                }
                return "false";
            }
        }
    }
}

module.exports = Pawn;