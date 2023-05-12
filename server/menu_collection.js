const mongoose = require("mongoose");

const menu_collectionSchema = new mongoose.Schema({
 
 name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
  

});
const Menu_Collection= mongoose.model("Collection", menu_collectionSchema);
module.exports = Menu_Collection;