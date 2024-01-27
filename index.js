const express=require('express')
const app=express()
require('dotenv').config()
const port=process.env.PORT
const userRouter=require('./routes/user')
const taskRouter=require('./routes/task')
const cors= require('cors')
app.use(cors({
    origin:"*"
}))

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,console.log('server is running'))