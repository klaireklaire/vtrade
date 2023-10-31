const express = require("express");
const Review = require("../models/review");
const router = express.Router();

router.get("/:reviewId", async (req, res, next) => {
    try{
        const { reviewId } = req.params
        const review = await Review.getReview(reviewId)
        return res.status(200).json({ review })
    } catch (err){
        next(err)
    }
})

router.get("/user/:userId", async (req, res, next) => {
    try{
        const { userId } = req.params
        const reviews = await Review.getUserReviews(userId)
        return res.status(200).json({ reviews })
    } catch (err){
        next(err)
    }
})

router.get("/listing/:listingId", async (req, res, next) => {
    try{
        const { listingId } = req.params
        const reviews = await Review.getListingReviews(listingId)
        return res.status(200).json({ reviews })
    } catch (err){
        next(err)
    }
})

router.post("/post", async (req, res, next) => {
    try{
        const review = await Review.postReview(req.body)
        return res.status(200).json({ review })
    } catch (err){
        next(err)
    }
})

router.put("/update", async (req, res, next) => {
    try{
        const review = await Review.editReview(req.body)
        return res.status(200).json({ review })
    } catch (err){
        next(err)
    }
})

router.delete("/:reviewId", async (req, res, next) => {
    try{
        const { reviewId } = req.params
        await Review.deleteReview(reviewId)
        return res.status(200).json();
    } catch (err){
        next(err)
    }
})


module.exports = router;