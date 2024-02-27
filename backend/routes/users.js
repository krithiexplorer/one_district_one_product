
const express = require("express");
const usersRouter = express.Router();
const zod = require('zod');
const Users = require("../db");
const jwt = require('jsonwebtoken');
const PASSWORD = "unchi";

const signupobj = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6),
    type:zod.string()
})

usersRouter.post('/signup',async(req,res)=>{
    const user = req.body;
    const {success} = signupobj.safeParse(user);
    const existingUser = await Users.findOne({
        username:user.username
    })
    if(!success || existingUser){
        return  res.status(422).json({
            msg:"Email already taken / Incorrect inputs"
        })
    }
    const currentUser = await Users.create(user)
    const userId = currentUser._id;
    if(currentUser){
        const token = jwt.sign({userId},PASSWORD)
        res.status(200).json({
            msg:"user Created successfully",
            token:token,
            type:currentUser.type
        })
    }
});


module.exports = usersRouter;
