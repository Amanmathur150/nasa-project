const dotenv = require("dotenv")
dotenv.config()

const server = require("./app")
const { getAllPlanets } = require("./models/planets")
const { mongoConnect } = require("./services/database")



const PORT = process.env.PORT || 8000



let connect= async()=>{
    await mongoConnect()
    await getAllPlanets()
    server.listen(PORT,()=>{
        console.log(`port is listening on ${PORT}`)
    })
}

connect()
