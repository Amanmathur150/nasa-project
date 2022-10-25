const dotenv = require("dotenv")
dotenv.config()

const server = require("./app")
const { getSpaceXlaunches } = require("./models/launches")
const { getAllPlanets } = require("./models/planets")
const { mongoConnect } = require("./services/database")



const PORT = process.env.PORT || 8000



let connect= async()=>{
    await mongoConnect()
    await getAllPlanets()
    await getSpaceXlaunches()
    server.listen(PORT,()=>{
        console.log(`port is listening on ${PORT}`)
    })
}

connect()
