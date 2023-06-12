const Piece = require('../Piece')
const ChessBoard = require('../ChessBoard');

class Bishop extends Piece {

    constructor(color, row, col ) {
        super(color, row, col );
    }

    checkMoviment(row, col, chessBoard){
        if(chessBoard.turn != chessBoard.getSelectedPiece().piece.color){
            return "false";
        }
        var currentRow = this.row; // para o loop
        var currentCol = this.col; // para o loop

        if(this.col == col || this.row == row){
            return "false";
        }

        var aux, aux2;
        if(row> this.row){
            currentRow++;
            aux = row-this.row;
            if(col>this.col) {
                currentCol++;
                aux2 = col - this.col;
            }else {
                currentCol--;
                aux2 = this.col - col;
            }
        }else{
            aux = this.row-row;
            currentRow--;
            if(col>this.col) {
                currentCol++;
                aux2 = col - this.col;
            }else {
                currentCol--;
                aux2 = this.col - col;
            }
        }
        if(aux != aux2)
            return "false";
        // ------


        while(currentRow != row && currentCol != col){
            if(chessBoard.getPiece(currentRow, currentCol) != null){
                if (this.color == chessBoard.getPiece(currentRow, currentCol).color){
                    return "false";
                }else{
                    return "CAPTURE";
                }
            }
            if(row>this.row)
                currentRow++;
            else
                currentRow--;

            if (col > this.col)
                currentCol++;
            else
                currentCol--;

        }
        if(chessBoard.getPiece(currentRow, currentCol) != null){
            if (this.color == chessBoard.getPiece(currentRow, currentCol).color){
                return "false";

            }else{
                return "CAPTURE";
                
            }
        }
        return "DEFALT";

    }


}

module.exports = Bishop