const asyncHandler = require('express-async-handler')
const Goal= require('../models/goalModel')
const User = require('../models/userModel')



const getGoals =asyncHandler( async(req,res)=>{
       const goals = await Goal.find({user:req.user.id})
       res.status(200).json(goals)
   
})

const setGoal =asyncHandler(async(req,res)=>{
     
       if(!req.body.text){
               res.status(400)
               throw new Error('Please enter a text field');
       }
      const goal=await Goal.create({
       user:req.user.id,
       text:req.body.text 
      })

      res.status(200).json(goal)
 
})

const updateGoal =asyncHandler(async(req,res)=>{
     const goal=await Goal.findById(req.params.id)
      console.log('ddd'+ req.body);
     if(!goal){
       res.status(400)
       throw new Error('Goal not found')
     }

    
     
     //check for user
     if(!req.user) {
       res.status(401)
       throw new Error('User not found')
     }
     //make sure the logged in user matches the goal user
     if(goal.user.toString() !== req.user.id){
       res.status(401)
       throw new Error('User not authorised')
     }
     const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
     res.status(200).json(updatedGoal)

})

const deleteGoal=asyncHandler(async(req,res)=>{
     
     const goal = await Goal.findById(req.params.id)

     if(!goal){
       res.status(400)
       throw new Error('Goal not found')
     }
      
    
     
     //check for user
     if(!req.user) {
       res.status(401)
       throw new Error('User not found')
     }
     //make sure the logged in user matches the goal user
     if(goal.user.toString() !== req.user.id){
       res.status(401)
       throw new Error('User not authorised')
     }

         await goal.deleteOne()
         res.status(200).json({ id: goal._id })

})

module.exports={
   getGoals,
   setGoal,
   updateGoal,
   deleteGoal
}