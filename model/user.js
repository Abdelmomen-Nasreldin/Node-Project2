const mongoose = require("mongoose");
const user = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true  },
  email: { type:String , required: true } ,
  type : { type: String, default: "user"}, 
},
{timestamps : true}
);

module.exports = mongoose.model("User", user)
