const { default: mongoose } = require("mongoose");

// Review schema
const reviewSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  author: {
    type: String,
    required: [true, "Mention author name"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please provide rating"],
  },
  comment: {
    type: String,
    required: [true, "Please add comment"],
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
//
