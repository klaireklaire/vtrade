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
      const offering = await Offer.postOffer(offer, images);
      return res.status(200).json({ offering });
    } catch (error) {
      next(error);
    }
  }
);

// router.post("/pot",async (req, res, next) => {
//   try {
//     const offer = req.body
   
//     const offering = await Offer.offerPost(offer);
//     return res.status(200).json({ offering });
//   } catch (error) {
//     next(error);
//   }
// }
// );


router.get("/", async (req, res, next) => {
  try {
    var offers = await Offer.getOffers();

    return res.status(200).json({ offers });
  } catch (error) {
    next(error);
  }
});

router.get("/highlights", async (req, res, next) => {
  try {
    var offers = await Offer.getHighlights();

    return res.status(200).json({ offers });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try{
   
    const id = req.params.id

    var offer = await Offer.getOfferById(id);

    return res.status(200).json({offer})

  } catch(error){
    next(error);
  }
});

router.get("/user/:userId", async (req, res, next) => {
  try{
    const {userId} = req.params
    var offers = await Offer.getOffersByUser(userId);
    return res.status(200).json({offers})

  } catch(error){
    next(error);
  }
});






module.exports = router;