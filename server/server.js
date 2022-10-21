const mongoose = require("mongoose") 
const server = require("./app")
const { getAllPlanets } = require("./models/planets")
const { mongoConnect } = require("./services/database")


// mongoose.connect("mongodb+srv://nasa-api:xCfORBr0nvMkPIuQ@nasacluster.w8clabo.mongodb.net/?retryWrites=true&w=majority")
const PORT = process.env.PORT || 8000

// password for data base
// xCfORBr0nvMkPIuQ

let connect= async()=>{
    await mongoConnect()
    await getAllPlanets()
    server.listen(PORT,()=>{
        console.log(`port is listening on ${PORT}`)
    })
}

connect()
