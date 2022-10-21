const mongoose = require("mongoose")

const planetsSchema = new mongoose.Schema({
  keplerName : {
    type : "String",
    required : true
  }
    
})

const Planets = mongoose.model("Planets" , planetsSchema)

module.exports = Planets