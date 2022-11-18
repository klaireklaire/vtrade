const express = require("express");
const Want = require("../models/want");
const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const router = express.Router();

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const favorites = await Favorite.getUserFavorites(userId);

    return res.status(200).json({ favorites: favorites });
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/ids", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const favorites = await Favorite.getFavoritesIds(userId);

    return res.status(200).json({ favorites: favorites });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:listingId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { listingId } = req.params;
      const { user } = res.locals;

      const userId = user.id;

      const favorite = await Favorite.postFavorite(userId, listingId);

      return res.status(200).json({ favorite: favorite });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:listingId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { listingId } = req.params;
      const { user } = res.locals;
      const userId = user.id;

      await Favorite.deleteFavorite(userId, listingId);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;