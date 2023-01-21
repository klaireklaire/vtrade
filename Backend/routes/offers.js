const express = require("express");
const Offer = require("../models/offer");
//const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const router = express.Router();


router.post("/post",async (req, res, next) => {
    try {
      const offer = req.body
      var images = Object.values(req.files)[0];
      if(!(images?.length)){
        images = [images]
      }
      console.log(images.length)
      const offering = await Offer.postOffer(offer, images);
      return res.status(200).json({ offering });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    var offers = await Offer.getOffers();

    return res.status(200).json({ offers });
  } catch (error) {
    next(error);
  }
});





module.exports = router;