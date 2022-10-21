const fs = require("fs")
const path = require("path")
const {parse} = require("csv-parse")
const {promisify} = require("util")
const Planets = require("./Planets.mongo")

const planets = []
const isHabitablePlanet = (planets)=>{
    return planets["koi_disposition"] === "CONFIRMED" && planets["koi_insol"] >0.36 && planets["koi_insol"] < 1.11
    && planets["koi_prad"] < 1.6
    }
const getAllPlanets = ()=>{
    return new Promise((resolve,reject)=>{
try{
    fs.createReadStream(path.join(__dirname , "..","data" ,"kepler_data.csv" )).pipe(parse({
        comment:"#",
        columns : true
    })).on("data",async (data)=>{
        if(isHabitablePlanet(data)){
            savePlanets(data)
          
        }
    }).on("error",(err)=>{
        reject(err)
    }).on("end",()=>{

        resolve()
    })
}catch(err){
    throw new Error("Something is wornt when loading kepler_data")
}
     

})}

// (async ()=>{

//     return await getAllPlanets()
// })().then(res=>{
//     console.log("hurrey chala diya ")
// }).catch(error=>{
//     console.log(error)
// })

const savePlanets = async (data)=>{
    await Planets.findOneAndUpdate({keplerName : data.kepler_name},{keplerName : data.kepler_name},{
        upsert:true
    })
}


module.exports = {
    getAllPlanets,
    planets
}


