const Task=require('../models/task')
const User=require('../models/user')

const Create=async(req,res)=>{
    const owner=req.params.id;
    try {
        const newTask=await Task.create({...req.body,owner})
        res.status(201).json(newTask)
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
}

const Tasks=async(req,res)=>{
  const id=req.params.id;
    try {
        const user = await User.findOne({ _id: id });
        await user.populate("tasks");
        res.json(user.tasks);
        console.log(user.tasks);
      } catch (e) {
        res.send(e);
        console.log(e);
      }
}

const Delete=async(req,res)=>{
    const id=req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id: id });
        res.json({TaskDeleted:task});
        console.log({TaskDeleted:task});
      } catch (e) {
        res.send(e);
        console.log(e);
      }
}


module.exports={Create,Tasks,Delete}

