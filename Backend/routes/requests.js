const express = require("express");
//const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const { Router } = require("express");
const Request = require("../models/request");
const router = express.Router();

router.get("/request/:requestId", async (req, res, next) => {
    try{
        const { requestId } = req.params
        const request = await Request.getRequestById(requestId)
        return res.status(200).json({ request })
    } catch(err){
        next(err)
    }
})

module.exports = router