const EnumColor = require('./EnumColor.js');
const SelectedPiece = require('./SelectedPiece.js')

const Bishop = require('./pieces/Bishop.js');
const Knight = require('./pieces/Knight.js');
const Rook = require('./pieces/Rook.js');
const Queen = require('./pieces/Queen.js');
const King = require('./pieces/King.js');
const Pawn = require('./pieces/Pawn.js');


class ChessBoard {
  constructor() {
    this.pieces = new Array(8).fill(null).map(() => new Array(8).fill(null));
    this.selectedPiece = null;

    this.turn = EnumColor.WHITE;

    // PREENCHENDO TABULEIRO
    for (let i = 0; i < 8; i++) {
      this.pieces[1][i] = new Pawn(EnumColor.WHITE, 1, i);
      this.pieces[6][i] = new Pawn(EnumColor.DARK, 6, i);
    }
    for (let i = 0; i < 8; i += 7) {
      this.pieces[0][i] = new Rook(EnumColor.WHITE, 0, i)
      this.pieces[7][i] = new Rook(EnumColor.DARK, 7, i);
    }
    for (let i = 1; i < 7; i += 5) {
      this.pieces[0][i] = new Knight(EnumColor.WHITE, 0, i)
      this.pieces[7][i] = new Knight(EnumColor.DARK, 7, i);
    }
    for (let i = 2; i < 6; i += 3) {
      this.pieces[0][i] = new Bishop(EnumColor.WHITE, 0, i)
      this.pieces[7][i] = new Bishop(EnumColor.DARK, 7, i);
    }
    this.pieces[0][3] = new Queen(EnumColor.WHITE, 0, 3)
    this.pieces[7][3] = new Queen(EnumColor.DARK, 7, 3);

    this.pieces[0][4] = new King(EnumColor.WHITE, 0, 4)
    this.pieces[7][4] = new King(EnumColor.DARK, 7, 4);
  }


  // CREATORS
  addPiece(piece) {
    this.pieces[piece.row][piece.col] = piece;
    piece.chessBoard = this;
  }


  // CHECK METHOD
  // corrigir esse setLayoutParams !!!
  movPiece(row, col) {
    var test = this.getSelectedPiece().piece.checkMoviment(row, col, this);

    if (test == "false") {
      test+="|"+this.getSelectedPiece().row+"-"+this.getSelectedPiece().col
      this.selectedPiece = null;
      return test;

    } else if (test === "CAPTURE") {
      this.pieces[row][col] = null;
    } else if (test === "CASTLE") {
      this.pieces[row][5] = this.pieces[row][7];
      this.pieces[row][7] = null;
      this.pieces[row][5].row = row;
      this.pieces[row][5].col = 5;
    } else if (test === "BIGCASTLE") {
      this.pieces[row][3] = this.pieces[row][0];
      this.pieces[row][0] = null;
      this.pieces[row][3].row = row;
      this.pieces[row][3].col = 3;
    }

    this.pieces[row][col] = this.getSelectedPiece().piece;
    this.pieces[this.getSelectedPiece().row][this.getSelectedPiece().col] = null;
    this.pieces[row][col].row = row;
    this.pieces[row][col].col = col;

    this.changeTurn()

    test+="|"+this.getSelectedPiece().row+"-"+this.getSelectedPiece().col
    this.selectedPiece = null;
    return test;
  }


  // ----------------------------------

  changeTurn() {
    if (this.getTurn() === EnumColor.WHITE) {
      this.setTurn(EnumColor.DARK);
    } else {
      this.setTurn(EnumColor.WHITE);
    }
  }


  // --------------------------------------------------------------------------------------------------------
  // GETTERS AND SETTERS

  setSelectedPiece(row, col) {
    this.selectedPiece = new SelectedPiece(row, col, this.getPiece(row, col));
  }

  getPiece(row, col) {
    return this.pieces[row][col];
  }

  getSelectedPiece() {
    return this.selectedPiece;
  }

  getTurn() {
    return this.turn;
  }

  getActivePieces(){
    var size =0;
    var activePieces = [];
    for(let rows=0; rows<8; rows++){
      for(let cols=0; cols<8; cols++){
        let currentPiece = this.getPiece(rows, cols);
        if( currentPiece !=null){
          activePieces[size] = currentPiece;
          size++;
        }
      }
    }
    return activePieces;

  }

  setPieces(pieces) {
    this.pieces = pieces;
  }

  setTurn(turn) {
    this.turn = turn;
  }

}

module.exports = ChessBoard