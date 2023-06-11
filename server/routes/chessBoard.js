const express = require('express');
const router = express.Router();
const viewDirename = "C:/Users/davib/workSpace/github/chess_platform/view"


router.get('/', (req, res, next) => {
    res.status(200).sendFile(viewDirename+"/pages/chessBoard.html")
})

router.post('/squareOnClick', (req, res) =>{
    res.status(200).send(req.body)
})


module.exports = router;