const Piece = require('../Piece.js')

class Knight extends Piece {

    constructor(color, row, col ) {
        super(color, row, col );
        this.type = "Knight";
    }

    checkMoviment(row, col, chessBoard) {
        if(chessBoard.getTurn() != chessBoard.getSelectedPiece().piece.color){
            return "false";
        }
        
        if(this.col == col || this.row == row){
            return "false";
        }

        if ((row == (this.row + 2)) || (row == (this.row - 2))) {
            if ((col == (this.col + 1)) || (col == (this.col - 1))) {
                console.log("testeee", "row +- 2");
                if(chessBoard.getPiece(row, col) != null){
                    if(this.color == chessBoard.getPiece(row, col).color){
                        return "false";
                    }else{
                        return "CAPTURE";
                    }
                }
            } else {
                return "false";
            }
        } else if ((col == (this.col + 2)) || (col == (this.col - 2))) {
            console.log("testeee", "col +- 2");
            if ((row == (this.row + 1)) || (row == (this.row - 1))) {
                if(chessBoard.getPiece(row, col) != null){
                    if(this.color == chessBoard.getPiece(row, col).color){
                        return "false";

                    }else{
                        return "CAPTURE";
                    }
                }
            } else {
                return "false";
            }
        } else {
            return "false";
        }

        return "DEFALT";
    }


}

module.exports = Knight;