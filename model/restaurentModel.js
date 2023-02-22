const { default: mongoose } = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please add restaurant name"] },
  address: { type: String, required: [true, "Please add restaurant address"] },
  description: {
    type: String,
    required: [true, "Please add restaurant description"],
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
