// const planets = require("../models/planets")
const Planets = require("../models/Planets.mongo")


exports.getAllPlanets = async (req,res,next)=>{
    const planets  =await Planets.find().select("keplerName")
    res.status(200).json(planets)
}

