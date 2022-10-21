const express = require("express")
const { httpSubmitLaunches, httpGetAllLaunches, httpAbortLaunches, httpAbortLaunche } = require("../controllers/LauncheControllers")
const { getAllPlanets } = require("../controllers/planetControllers")

const launcheRoute  = express.Router()

launcheRoute.route("/launches").get(httpGetAllLaunches).post(httpSubmitLaunches)
launcheRoute.route("/launches/:id").delete(httpAbortLaunche)
launcheRoute.route("/abort-launches").get(httpAbortLaunches)

module.exports = launcheRoute