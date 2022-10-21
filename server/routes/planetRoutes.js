const express = require("express")
const { getAllPlanets } = require("../controllers/planetControllers")

const planetRoute  = express.Router()

planetRoute.route("/planets").get(getAllPlanets)

module.exports = planetRoute