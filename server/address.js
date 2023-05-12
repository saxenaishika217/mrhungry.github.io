const mongoose = require("mongoose");
Schema=mongoose.Schema;

const addressSchema = new mongoose.Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
},
 firstname: {
    type: String,
    required: true,
  },
 lastname: {
    type: String,
    required: true,
  },
   address:{
      type:String,
      required:true,
  },
  address2:{
    type:String,
    
},
country:{
  type:String,
  required:true,
},
state:{
  type:String,
  required:true,
},
zip:{
  type:String,
  required:true,
}


});
const Address= mongoose.model("Address", addressSchema);
module.exports = Address;