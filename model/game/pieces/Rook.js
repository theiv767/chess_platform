const Piece = require('../Piece.js')

class Rook extends Piece {

    Rook(color, row, col, srcImage) {
        super(color, row, col, srcImage);
    }

    checkMoviment(row, col, chessBoard) {
        if(this.chessBoard.turn != this.chessBoard.selectedPiece.piece.color){
            return "false";
        }
        if((this.col != col && this.row != row) || (this.row == row && this.col == col)) {
            return "false";
        }
        if(this.col == col && this.row == row){
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
    }

}

module.exports = Rook;