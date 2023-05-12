const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  cart:[{
    _id:String,
    quantity:String,
    name:String,
    price:String,
    image:String
  }]
});
const User = mongoose.model("User", userSchema);
module.exports = User;
