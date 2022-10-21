const { getAllLaunches, submitLaunch, abortLunches } = require("../models/launches")

exports.httpGetAllLaunches = async (req,res,next)=>{
    const launches =  await getAllLaunches(req.query)
    return res.status(200).json(launches)
}

exports.httpSubmitLaunches = async (req,res,next)=>{
    try{
       const {launchDate , mission , rocket , target} = req.body
        if(!launchDate || !mission || !rocket || !target){
            return res.status(400).json({
                error : "Missing required launch property"
            })
        }
        const createdLaunch =  await submitLaunch({
            mission  , 
            rocket,
            launchDate,
            target
        })
        res.status(201).json(
            createdLaunch
        )
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}
exports.httpAbortLaunche = async (req,res,next)=>{
    try{
      
        const AbortLaunch =  await abortLunches(req.params.id)
        res.status(204).json(
            AbortLaunch
        )
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}
exports.httpAbortLaunches = async (req,res,next)=>{
    try{
      
        const AbortLaunches =  await getAbortsLaunches()
        res.status(204).json(
            AbortLaunches
        )
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}