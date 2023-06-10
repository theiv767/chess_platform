const EnumColor = require('./EnumColor.js');

class ChessBoard {
    constructor() {
      this.pieces = new Array(8).fill(null).map(() => new Array(8).fill(null));
      this.squares = new Array(8).fill(null).map(() => new Array(8).fill(null));
      this.selectedPiece = null;
      this.turn = EnumColor.WHITE;
    }
  

    // CREATORS
    addSquared(row, col, squared) {
      this.squares[row][col] = squared;
    }
  
    addPiece(piece) {
      this.pieces[piece.row][piece.col] = piece;
      piece.chessBoard = this;
    }
  

    // CHECK METHOD
    // corrigir esse setLayoutParams !!!
    movPiece(piece, row, col) {
      const test = selectedPiece.piece.checkMoviment(row, col, this);
  
      if (test === "false") {
        this.selectedPiece = null;
        return;
      } else if (test === "CAPTURE") {
        this.pieces[row][col].getImage().setVisibility(View.INVISIBLE);
        this.pieces[row][col] = null;
      } else if (test === "CASTLE") {
        this.pieces[row][5] = this.pieces[row][7];
        this.pieces[row][7] = null;
        this.pieces[row][5].getImage().setLayoutParams(squares[row][col-1].getLayoutParams());
        this.pieces[row][5].setRow(row);
        this.pieces[row][5].setCol(5);
      } else if (test === "BIGCASTLE") {
        this.pieces[row][3] = this.pieces[row][0];
        this.pieces[row][0] = null;
        this.pieces[row][3].getImage().setLayoutParams(squares[row][col+1].getLayoutParams());
        this.pieces[row][3].setRow(row);
        this.pieces[row][3].setCol(3);
      }
  
      this.pieces[row][col] = selectedPiece.piece;
      this.pieces[selectedPiece.getRow()][selectedPiece.getCol()] = null;
      this.pieces[row][col].getImage().setLayoutParams(squares[row][col].getLayoutParams());
      this.pieces[row][col].setRow(row);
      this.pieces[row][col].setCol(col);
  
      if (turn === EnumColor.WHITE) {
        turn = EnumColor.DARK;
      } else {
        turn = EnumColor.WHITE;
      }
      this.selectedPiece = null;
    }


    // ----------------------------------
  
    changeTurn() {
      if (this.turn === EnumColor.WHITE) {
        this.turn = EnumColor.DARK;
      } else {
        this.turn = EnumColor.WHITE;
      }
    }


    // --------------------------------------------------------------------------------------------------------
    // GETTERS AND SETTERS

    setSquare(row, col, image) {
        this.squares[row][col] = image;
      }
    
    setSelectedPiece(row, col) {
        this.selectedPiece = new SelectedPiece(row, col, this.getPiece(row, col));
    }

    getPiece(row, col) {
        return this.pieces[row][col];
      }
    
    getSquared(row, col) {
        return this.squares[row][col];
    }


    
    get selectedPiece() {
      return this.selectedPiece;
    }
  
    get turn() {
      return this.turn;
    }
  
    set pieces(pieces) {
      this.pieces = pieces;
    }
  
    set turn(turn) {
      this.turn = turn;
    }

  }

module.exports = ChessBoard