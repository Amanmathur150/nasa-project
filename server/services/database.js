const mongoose = require("mongoose") 

mongoose.connection.once("open", () => {
    console.log("*- MongoDB connection established -*");
});

mongoose.connection.on("error", (error) => {
    console.error("Something went wrong with our MongoDB ", error);
});

 async function mongoConnect() {
    try{

        await mongoose.connect("mongodb+srv://nasa-api:xCfORBr0nvMkPIuQ@nasacluster.w8clabo.mongodb.net/nasa?retryWrites=true&w=majority")
   
        }catch(error){
            console.log(error)
        }
  }
  
  async function mongoDisconnect() {
    try{

        await mongoose.disconnect();
    }catch(error){
        console.log(error)
    }
  }

  module.exports = {
    mongoConnect,
    mongoDisconnect
  }
  