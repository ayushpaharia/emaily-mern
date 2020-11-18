const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  // username: {
  //   type: String,
  //   required: true,
  // },
});

module.exports = User = mongoose.model("users", userSchema);
