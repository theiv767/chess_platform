const Piece = require('../Piece.js')

class Queen extends Piece {

    Queen(color, row, col, srcImage) {
        super(color, row, col, srcImage);
    }

    checkMoviment(row, col, chessBoard) {
        if(this.chessBoard.turn != this.chessBoard.selectedPiece.piece.color){
            return "false";
        }
        if(this.col == col && this.row == row){
            return "false";
        }

        if(this.col == col || this.row == row){ // se não puder ser um bispo;
            if((this.col != col && this.row != row) || (this.row == row && this.col == col)) {
                return "false";
            }
            var currentRow = this.row;
            var currentCol = this.col;

            if(row > this.row){
                currentRow++;
                while(currentRow < row){
                    if(this.chessBoard.getPiece(currentRow, currentCol) != null){
                        if (this.color == this.chessBoard.getPiece(currentRow, currentCol).color){
                            return "false";
                        }else{
                            this.canCastle = false;
                            return "CAPTURE";
                        }
                    }
                    currentRow++;
                }
            }else if(this.row > row){
                currentRow--;
                while(currentRow > row){
                    if(this.chessBoard.getPiece(currentRow, currentCol) != null){
                        if (this.color == this.chessBoard.getPiece(currentRow, currentCol).color){
                            return "false";
                        }else{
                            this.canCastle = false;
                            return "CAPTURE";
                        }
                    }
                    currentRow--;
                }
            }else if(col > this.col){
                currentCol++;
                while(currentCol < col){
                    if(this.chessBoard.getPiece(currentRow, currentCol) != null){
                        if (this.color == this.chessBoard.getPiece(currentRow, currentCol).color){
                            return "false";
                        }else{
                            this.canCastle = false;
                            return "CAPTURE";
                        }
                    }
                    currentCol++;
                }

            }else if(this.col > col){
                currentCol--;
                while(col < currentCol){
                    if(this.chessBoard.getPiece(currentRow, currentCol) != null){
                        if (this.color == this.chessBoard.getPiece(currentRow, currentCol).color){
                            return "false";
                        }else{
                            this.canCastle = false;
                            return "CAPTURE";
                        }
                    }
                    currentCol--;
                }
            }
            if(this.chessBoard.getPiece(currentRow, currentCol) != null){
                if (this.color == this.chessBoard.getPiece(currentRow, currentCol).color){
                    return "false";
                }else{
                    this.canCastle = false;
                    return "CAPTURE";
                }
            }

            this.canCastle = false;
            return "DEFALT";


        }else{ // se for um bispo -----------------------------------------------

            var currentRow = this.row; // para o loop
            var currentCol = this.col; // para o loop

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

}

module.exports = Queen;