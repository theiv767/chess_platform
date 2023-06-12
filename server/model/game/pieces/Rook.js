const Piece = require('../Piece.js')

class Rook extends Piece {

    constructor(color, row, col ) {
        super(color, row, col );
        this.canCastle = true;
    }

    checkMoviment(row, col, chessBoard) {
        if(chessBoard.turn != chessBoard.selectedPiece.piece.color){
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
                if(chessBoard.getPiece(currentRow, currentCol) != null){
                    if (this.color == chessBoard.getPiece(currentRow, currentCol).color){
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
                if(chessBoard.getPiece(currentRow, currentCol) != null){
                    if (this.color == chessBoard.getPiece(currentRow, currentCol).color){
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
                if(chessBoard.getPiece(currentRow, currentCol) != null){
                    if (this.color == chessBoard.getPiece(currentRow, currentCol).color){
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
                if(chessBoard.getPiece(currentRow, currentCol) != null){
                    if (this.color == chessBoard.getPiece(currentRow, currentCol).color){
                        return "false";
                    }else{
                        this.canCastle = false;
                        return "CAPTURE";
                    }
                }
                currentCol--;
            }
        }
        if(chessBoard.getPiece(currentRow, currentCol) != null){
            if (this.color == chessBoard.getPiece(currentRow, currentCol).color){
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