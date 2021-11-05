const mongoose = require("mongoose");

// id(string) - "5592d311d7c6770300911b65";

const propertySchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, "Please enter street address"],
  },
  city: {
    type: String,
    required: [true, "Please enter the city"],
  },
  state: {
    type: String,
    required: [true, "Please enter the state code"],
  },
  zip: {
    type: String,
    required: [true, "Please enter the zip "],
  },
  rent: {
    type: Number,
    required: [true, "Please enter the rent"],
  },
  photo: {
    type: String,
  },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("Property", propertySchema);
