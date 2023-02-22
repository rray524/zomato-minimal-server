const express = require("express");
const {
  createRestaurant,
  getRestaurant,
  createReview,
  getSingleRestaurant,
  getSingleRestaurantReview,
  adminAnalytics,
} = require("../controllers/restaurantControllers");
const auth = require("../middleWare/authMiddleWare");
const router = express.Router();

router.post("/", createRestaurant);
router.get("/", getRestaurant);
router.get("/admin", adminAnalytics);
router.post("/reviews/:id", createReview);
router.get("/reviews/:id", getSingleRestaurantReview);
router.get("/:id", getSingleRestaurant);

module.exports = router;
