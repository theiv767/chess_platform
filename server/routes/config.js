const express = require('express');
const router = express.Router();
const viewDirename = "C:/Users/davib/workSpace/github/chess_platform/view"


router.get('/', (req, res, next) => {
    res.status(200).sendFile(viewDirename+"/pages/config.html")
})


module.exports = router;