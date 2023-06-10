const Piece = require('../Piece.js')

class King extends Piece{

    King(color, row, col, srcImage) {
        super(color, row, col, srcImage);
        this.canCastle = true;
    }

    checkMoviment(row, col, chessBoard){
        if(this.chessBoard.turn != this.chessBoard.selectedPiece.piece.color){
            return "false";
        }
        if(this.col == col && this.row == row){
            return "false";
        }

        if(col == (this.col+2)){
            if(this.canCastle && (this.chessBoard.getPiece(row, 7) != null)){//check roque
                if(this.chessBoard.getPiece(row, 7).canCastle){
                    for(i = this.col()+1; i< col; i++){
                        if(this.chessBoard.getPiece(row,i) != null){
                            return "false";
                        }
                    }
                    this.canCastle = false;
                    return "CASTLE";
                }
            }
        }else if(col == (this.col-2)){
            if(this.canCastle && (this.chessBoard.getPiece(row, 0) != null)){ //check grande roque
                if(this.chessBoard.getPiece(row, 0).canCastle){
                    for(i = this.col-1; i>col; i--){
                        if(this.chessBoard.getPiece(row,i) != null){
                            return "false";
                        }
                    }
                    this.canCastle = false;
                    return "BIGCASTLE";
                }
            }
        }else  if(row >= this.row-1 && row <= this.row+1 && col >= this.col-1 && col <= this.col+1){ //check movimentos normais

           if(this.chessBoard.piece(row, col) != null){
               if(this.chessBoard.getPiece(row, col).color != this.color){
                   this.canCastle = false;
                   return "CAPTURE";
               }
           }else{
               this.canCastle = false;
               return "DEFAULT";
           }
        }
        return "false";

    }

}

module.exports = King;