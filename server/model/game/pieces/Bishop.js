const Piece = require('../Piece.js')

class Bishop extends Piece {

    Bishop(color, row, col, srcImage) {
        super(color, row, col, srcImage);
        this.canCastle = true;
    }

    checkMoviment(row, col, chessBoard){
        if(this.chessBoard.turn != this.chessBoard.selectedPiece.piece.color){
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
            if(this.chessBoard.getPiece(currentRow, currentCol) != null){
                if (this.color == this.chessBoard.getPiece(currentRow, currentCol).color){
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
        if(this.chessBoard.getPiece(currentRow, currentCol) != null){
            if (this.color == this.chessBoard.getPiece(currentRow, currentCol).color){
                return "false";

            }else{
                return "CAPTURE";
                
            }
        }
        return "DEFALT";

    }


}

module.exports = Bishop