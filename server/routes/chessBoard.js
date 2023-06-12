const express = require('express');
const router = express.Router();
const viewDirename = "C:/Users/davib/workSpace/github/chess_platform/view"


const ChessBoard = require('../model/game/ChessBoard')
const chessBoard = new ChessBoard();


router.get('/', (req, res, next) => {
    res.status(200).sendFile(viewDirename+"/pages/chessBoard.html")
    
})


router.post('/squareOnClick', (req, res) =>{
    // ARRUMAR AQUI, DANDO ERRO !!!!!!!!!!!!!!!!!!!!!!!!!!!

    var square = req.body.id + "";
    var squareRow = parseInt(square.split("-")[0]);
    var squareCol = parseInt(square.split("-")[1]);

    if (chessBoard.selectedPiece == null) {
        if (chessBoard.getPiece(squareRow , squareCol) != null) {
            chessBoard.setSelectedPiece(squareRow, squareCol);
            console.log(chessBoard.getSelectedPiece().piece)
        }
        console.log("selectedPiece null")
    } else {
        console.log(chessBoard.movPiece(chessBoard.getSelectedPiece(), squareRow, squareCol));
    }


    res.status(200).send("o id é: "+req.body.id)
})


module.exports = router;