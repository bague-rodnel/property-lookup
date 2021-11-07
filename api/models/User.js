const mongoose = require("mongoose");

// id (string) - "5592d311d7c6770300911b65"

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
  },
  email: {
    type: String,
    required: "Please enter email",
  },
  avatar: String,
});

module.exports = mongoose.model("User", userSchema);
