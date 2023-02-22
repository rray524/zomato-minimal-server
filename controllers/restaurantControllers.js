const Restaurant = require("../model/restaurentModel");
const asyncHandler = require("express-async-handler");
const Review = require("../model/reviewModel");

//*********** */ create restaurant

const createRestaurant = asyncHandler(async (req, res) => {
  const { name, address, description } = req.body;
  if (!name || !address || !description) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const existRestaurant = await Restaurant.findOne({ name });
  if (existRestaurant) {
    res.status(400);
    throw new Error("Restaurant already exist");
  }
  const restaurant = new Restaurant({ name, address, description });
  const savedRestaurant = await restaurant.save();
  res.status(201).json(savedRestaurant);
});

//*********** */ get all restaurants
const getRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.find().populate("reviews");
  res.status(200).json(restaurant);
});

//*********** */ get single restaurant
const getSingleRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.json(restaurant);
});

//*********** */ create restaurant reviews
const createReview = asyncHandler(async (req, res) => {
  const { author, rating, comment } = req.body;
  if (!author || !rating || !comment) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // author already did review?

  const authorReviewExist = await Review.findOne({ author });
  if (authorReviewExist) {
    res.status(400);
    throw new Error("Author Review already exists");
  }

  const review = new Review({
    restaurant: req.params.id,
    author: req.body.author,
    rating: req.body.rating,
    comment: req.body.comment,
  });
  await review.save();
  res.status(201).json(review);
});

// *********** */get single restaurant reviews

const getSingleRestaurantReview = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ restaurant: req.params.id });
  res.json(reviews);
});
// *********** */get admin analytics
const adminAnalytics = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find();
  const reviewCounts = await Promise.all(
    restaurants.map(async (restaurant) => {
      const count = await Review.countDocuments({ restaurant: restaurant._id });
      return { restaurant: restaurant.name, count };
    })
  );
  res.json(reviewCounts);
});
module.exports = {
  createRestaurant,
  getRestaurant,
  createReview,
  getSingleRestaurant,
  getSingleRestaurantReview,
  adminAnalytics,
};
