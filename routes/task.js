const express=require('express')
const router=express.Router()
const {Create,Tasks,Delete}=require('../controllers/task')

router.post('/create/:id',Create)
router.get('/tasks/:id',Tasks)
router.delete('/delete/:id',Delete)

module.exports=router