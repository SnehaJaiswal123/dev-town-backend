const mongoose=require('../db/connect')
const bcrypt=require('bcrypt')

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    due:{
        type:Date,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})



const task = mongoose.model("Task", taskSchema)

module.exports=task
