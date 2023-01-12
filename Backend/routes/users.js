const express = require("express");
const User = require("../models/user");

const { createUserJwt } = require("../utils/tokens");

const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const { Router } = require("express");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = createUserJwt(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register(req.body);

    const token = createUserJwt(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { id } = res.locals.user;

    const user = await User.fetchUserById(id);

    const publicUser = User.makePublicUser(user);

    return res.status(200).json({ user: publicUser });
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.fetchUserById(userId);
    return res.status(200).json({ user, user });
  } catch (error) {
    next(error);
  }
});

// 

module.exports = router;
