const mongoose=require('mongoose')
require('dotenv').config()

;(async()=>{
    try{
       await mongoose.connect(process.env.MONG0_URL)
       console.log('db connected successfully');
    }
    catch(err){
        console.log("Error in connecting db",err);
    }
})();


module.exports=mongoose