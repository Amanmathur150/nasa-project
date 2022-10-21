const mongoose = require("mongoose")

const LaunchesSchema = new mongoose.Schema({
  flightNumber : {
    type : Number,
    required : true,
    unique: true
  },
  customers  : {
    type : [String],
    required : true,
    default : ["Aman'Rockets" , "ZTM" , "NASA"]
  },
  mission : {
    type : String,
    required : true,
  } , 
  rocket : {
    type : String,
    required : true,
  } , 
  launchDate : {
    type : Date , 
    required : true,
  },
  target : {
    type : String,
  },

  upcoming : {
    type : Boolean,
    required : true,
    default : true
  },
  success : {
    type : Boolean,
    required : true,
    default : true
  }
    
})

const Launches = mongoose.model("Launches" , LaunchesSchema)

module.exports = Launches