const express = require("express");
const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const { Router } = require("express");
const Appimage = require("../models/appimage");
const router = express.Router();

router.get("/listing/:listingId", async (req, res, next) => {
    try{
        const { listingId } = req.params
        const images = await Appimage.getImagesForListing(listingId)
        return res.status(200).json(images)
    } catch(err){
        next(err)
    }
})

router.put("/user/update/:userId", async (req, res, next) => {
    try{
        const { userId } = req.params
        const images = Object.values(req.files)[0]
        const image = await Appimage.postProfileImage(userId, images)
        return res.status(200).json(image)
    } catch(err){
        next(err)
    }
})

router.post("/listing/post/item", async (req, res, next) => {
    try{
        const images = Object.values(req.files)[0]
        const image = await Appimage.postListingImages(5, images)
        return res.status(200).json(image)
    } catch (err){
        next(err)
    }
})

module.exports = router