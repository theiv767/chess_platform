const Piece = require('../Piece.js')
const EnumColor = require('../EnumColor.js')

class Pawn extends Piece {

    constructor(color, row, col) {
        super(color, row, col);
    }
    
    checkMoviment(testRow, testCol, chessBoard) {
        if(chessBoard.getTurn() != chessBoard.getSelectedPiece().piece.color){
            return "false";
        }
        
        if(this.col == testCol && this.row == testRow){
            console.log("2")
            return "false";
        }

        if (this.color == EnumColor.WHITE) {
            if (this.row == 1) { // primeiro lançe que pode ser de uma ou duas casas
                if ((testRow == 2 || testRow == 3) && (testCol == this.col)) {
                    return "DEFAULT";

                }
                // else{
                //     console.log("3")
                //     return "false";
                // }
            } 

            if ((testRow == this.row + 1) && (testCol == this.col)) {
                if (chessBoard.getPiece(testRow, testCol) == null) {
                    console.log("testeee", "defalt");
                    return "DEFAULT";
                }
            }
            if (testRow == this.row + 1 && (testRow == this.col + 1 || testCol == this.col - 1)) {
                if (chessBoard.getPiece(testRow, testCol) == null)
                    return "false";
                if (chessBoard.getPiece(testRow, testCol).color == EnumColor.DARK) {
                    console.log("testeee", "capture");
                    return "CAPTURE";
                }
            }
            return "false";

        } else { //lances das pretas
            if (this.row == 6) { // primeiro lançe que pode ser de uma ou duas casas
                if ((testRow == 5 || testRow == 4) && (testCol == this.col)) {
                    console.log("testeee", "defalt");
                    return "DEFAULT";
                }
                // else
                //     return "false";

            }
            if ((testRow == this.row - 1) && (testCol == this.col)) {
                if (chessBoard.getPiece(testRow, testCol) == null) {
                    console.log("testeee", "defalt");
                    return "DEFAULT";
                }
            }
            if (testRow == this.row - 1 && (testCol == this.col + 1 || testCol == this.col - 1)) {
                if (chessBoard.getPiece(testRow, testCol) == null)
                    return "false";
                if (chessBoard.getPiece(testRow, testCol).color == EnumColor.WHITE) {
                    console.log("testeee", "capture");
                    return "CAPTURE";
                }
            }
            return "false";
        }
    }
}

module.exports = Pawn;