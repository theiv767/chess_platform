const express = require('express');
const router = express.Router();
const viewDirename = "view/pages/"
const jwt = require('jsonwebtoken')
const ChessBoard = require('../model/game/ChessBoard')
const chessBoard = new ChessBoard();


router.get('/', (req, res, next) => {
    res.status(200).sendFile(viewDirename+"chessBoard.html", { root: __dirname+"../../../" })
    
})



router.get('/chessBoard', (req, res, next) => {
    var activePieces = chessBoard.getActivePieces()
    res.status(200).json(activePieces);

})


router.post('/squareOnClick', (req, res) =>{
    // ARRUMAR AQUI, DANDO ERRO !!!!!!!!!!!!!!!!!!!!!!!!!!!

    var square = req.body.id + "";
    console.log("id: "+ square)
    var squareRow = parseInt(square.split("-")[0]);
    console.log("row: "+ squareRow)
    var squareCol = parseInt(square.split("-")[1]);
    console.log("col: "+ squareCol)
    console.log("----------------------------------")

    var moviment = "";
    if (chessBoard.selectedPiece == null) {
        if (chessBoard.getPiece(squareRow , squareCol) != null) {
            chessBoard.setSelectedPiece(squareRow, squareCol);
            console.log("selectedPiece")
            console.log(chessBoard.getSelectedPiece().piece)
            res.status(200).json({
                canMov: false,
                selectedPiece: true,
                disSelect: false
            })
        }else{
            res.status(200).json({
                canMov: false,
                selectedPiece: false,
                disSelect: false
            })
        }
        

    } else {
        moviment = chessBoard.movPiece(squareRow, squareCol);
        let selectedPieceId = moviment.split("|")[1]
        moviment = moviment.split("|")[0]
        if(moviment == "false"){
            res.status(200).json({
                canMov: false,
                selectedPiece: false,
                disSelect: true,
                id: selectedPieceId
            })
        }else{
            res.status(200).json({
                canMov: true,
                type: moviment,
                idToMov: selectedPieceId
            })
        }
       
    }

})

router.delete('/chessBoard', (req, res)=>{
    const {row, col} = req.body;
    chessBoard.deletePiece(row, col)
    var activePieces = chessBoard.getActivePieces()
    res.status(200).json(activePieces);
})

router.put('/chessBoard', (req, res)=>{
    const {_row, _col, piece} = req.body;
    chessBoard.setPiece(_row, _col, piece)
    
    var activePieces = chessBoard.getActivePieces()
    res.status(200).json(activePieces);

})




module.exports = router;