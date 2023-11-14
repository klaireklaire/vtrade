const express = require("express");
const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const { Router } = require("express");
const Listing = require("../models/listing");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const listings = await Listing.getListings()
    return res.status(200).json({ listings });
  } catch (err) {
    next(err);
  }
});

router.get("/item/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const listing = await Listing.getListingById(id)
    return res.status(200).json({ listing });
  } catch (err) {
    next(err);
  }
});

router.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params
    const listings = await Listing.getListingsByUser(userId)
    return res.status(200).json({ listings });
    } catch (err) {
    next(err);
  }
});

router.get("/filter", async (req, res, next) => {
  try {
    const { min } = req.body
    const { max } = req.body
    const listings = await Listing.filterPrice(min, max)
    return res.status(200).json({ listings })
  } catch (err) {
    next(err)
  }
})

router.post("/item", async (req, res, next) => {
  try{
    const listingInfo = { ...req.body }
    const images = Object.values({ ...req.files })[0]
    const listing = await Listing.postListing(listingInfo, images)
    return res.status(200).json({ listing })
  } catch (err){
    next(err)
  }
})

router.delete(
  "/:listingId",
  //security.requireAuthenticatedUser,
 // permissions.userOwnsListing,
  async (req, res, next) => {
    try {
      const { listingId } = req.params;
      await Listing.deleteListing(listingId);
      return res.status(200).json();
    } catch (error) {}
  }
);

module.exports = router;
