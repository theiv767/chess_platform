const express = require('express');
const router = express.Router();
const viewDirename = "view/pages/"


router.get('/', (req, res, next) => {
    res.status(200).sendFile(viewDirename+"config.html", { root: __dirname+"../../../" })
})


module.exports = router;