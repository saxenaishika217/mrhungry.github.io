const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
  },
  dish_type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price:{
      type:String,
      required:true,
  }


});
const Menu= mongoose.model("Menu", menuSchema);
module.exports = Menu;