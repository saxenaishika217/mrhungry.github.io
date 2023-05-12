const mongoose = require("mongoose");
Schema = mongoose.Schema;

const ordersSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  createddate:  {type: Date, default: Date.now} ,
  order: [
    {
      name: String,
      price: String,
      image: String,
      quantity:String,
    }
  ],
  totalprice: String,
});
const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;
