const Launches = require("./Launches.mongo")
const axios =require("axios")

exports.getAllLaunches = async (query) =>{
    // pagination for smooth flow of data
    const {limit , page} =  query
    let Limit = Number(limit)
    let skip = Number(limit)
    let Page = Number(page)
    if(!limit) Limit =10
    if(!page) Page =1
  
    skip = (Page === 1 ? 0 : Page -1)   * limit

    return await Launches.find({}).skip(skip).limit(Limit)
}
exports.getAbortsLaunches = async () =>{
    // for abortion of the launches 
    return await Launches.find({
        upcoming : false , 
        success : false
    })
}
exports.submitLaunch = async (launch)=>{

    let flightNumber = await getLastFlightNumber() + 1
    launch.flightNumber = flightNumber
    return await Launches.findOneAndUpdate({flightNumber : launch.flightNumber},launch,{
        upsert : true,
        new :true
    })
}

const getSpaceXlaunches = async () =>{
    try{

        const responseDoc =  await axios.post("https://api.spacexdata.com/v5/launches/query",{
            query : {
        },
        options : {
            pagination : false,
            populate : [{
                path :"rocket",
                select : "name"
            }
        
        ,
              {
                  path :"payloads",
                  select : "customers"
                }
                
            ]
        }})
        
        
        
        if(await spaceXdatabaseExist()){
            console.log("spaceX launches Already Exist")
            return 
        }else{
            
            
            
    for (let doc of responseDoc.data.docs){
        let customers = []
        for (let payload of doc.payloads){
         
    
            payload.customers.forEach((item)=>{
       
                customers.push(item)
            }) 
        }
        
        let launchesObject = {
            flightNumber : doc.flight_number,
            customers  : customers,
            mission : doc.name,
            rocket : doc.rocket.name,
            launchDate : new Date(doc.date_local),
            upcoming : doc.upcoming , 
            success : doc.success
            
        }
        
        
        await Launches.findOneAndUpdate({flightNumber : launchesObject.flightNumber},launchesObject,{
            upsert : true,
            new :true
        })
    }
    
    
}

}catch(error){
    console.log(error)
}
}

const spaceXdatabaseExist = async()=>{
    try {
        
        const spaceXData =  await Launches.findOne({
                flightNumber : 3 ,
                mission : "Trailblazer" ,
                    })
        return spaceXData ?  true : false
    } catch (error) {
        
    }
}

getSpaceXlaunches()

exports.abortLunches = async (flightNumber)=>{
    return await Launches.findOneAndUpdate({flightNumber : flightNumber} , {
        success : false,
        upcoming :false
    },{
        new:true
    })
}

const getLastFlightNumber = async ()=>{
    let lastNumber = (await Launches.find({}).sort("-flightNumber").limit(1))[0].flightNumber
    lastNumber = !lastNumber ? 100 : lastNumber
    return lastNumber
} 