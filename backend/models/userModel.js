const mongoose =require("mongoose")

const User= mongoose.Schema({
  name:{
      type:String,
      required:true

  },
  email:{
      type:String,
      required:true,
      unique:true

  },
  mobile:{
      type:String,
     

  },
  password:{
      type:String,
      required:true

  },
  isAdmin:{
      type:Number,
      default:0,

  },
  image:{
    type:String
   
},
is_blocked:{
    type:Number,
    default:1,
},


})


module.exports=mongoose.model("User",User)