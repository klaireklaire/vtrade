const express = require("express");
//const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const { Router } = require("express");
const Rating = require("../models/rating");
const router = express.Router();

router.get("/listing/:listingId", async (req, res, next) => {
    try{
        const { listingId } = req.params
        const rating = await Rating.getListingRating(listingId)
        return res.status(200).json({ rating })
    } catch(err){
        next(err)
    }
})

router.get("/:ratingId", async (req, res, next) => {
    try {
        const { ratingId } = req.params
        const rating = await Rating.getRating(ratingId)
        return res.status(200).json({ rating })
    } catch(err){
        next(err)
    }
})

router.get("/user/:userId", async (req, res, next) => {
    try{
        const { userId } = req.params
        const rating = await Rating.getUserRating(userId)
        return res.status(200).json({ rating })
    } catch(err){
        next(err)
    }
})

router.post("/post", async (req, res, next) => {
    try{
        const rating = await Rating.postRating(req.body)
        return res.status(200).json({ rating })
    } catch(err){
        next(err)
    }
})

router.put("/update", async (req, res, next) => {
    try{
        const rating = await Rating.editRating(req.body)
        return res.status(200).json({ rating })
    } catch (err){
        next(err)
    }
})

router.delete("/:ratingId", async (req, res, next) => {
    try{
        const { ratingId } = req.params
        await Rating.deleteRating(ratingId)
        return res.status(200).json();
    } catch (err){
        next(err)
    }
})

module.exports = router