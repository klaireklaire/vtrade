const express = require("express");
const Want = require("../models/want");
const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const router = express.Router();

router.post("/add",async (req, res, next) => {
  try {
    const want = req.body
   
    const wanting = await Want.postWant(want);
    return res.status(200).json({ wanting });
  } catch (error) {
    next(error);
  }
}
);

module.exports = router;