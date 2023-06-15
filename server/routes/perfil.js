const express = require('express');
const router = express.Router();
const viewDirename = "view/pages/"
const jwt = require('jsonwebtoken')

router.get('/', (req, res, next) => {
    res.status(200).sendFile(viewDirename+"perfil.html", { root: __dirname+"../../../" })
})

module.exports = router;