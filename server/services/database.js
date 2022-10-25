const mongoose = require("mongoose") 

mongoose.connection.once("open", () => {
    console.log("*- MongoDB connection established -*");
});

mongoose.connection.on("error", (error) => {
    console.error("Something went wrong with our MongoDB ", error);
});

 async function mongoConnect() {
    try{

      
        mongoose.connect(process.env.DATABASE_URL)
   
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
  