import express from 'express'

/* import Business schema */
import business from '../Models/BusinessModel.js'
import user from '../Models/UserModel.js'
// import {makelogin} from '../helpers/randomNumber.js' 

const UserRouter = express.Router();

UserRouter.post('/createUser', async (req, res) => {
    const {userName,lastName ,eMail}  = req.body
    const dateCreated = new Date().toLocaleString()

    const a = await user.findOne({email:eMail})
    if(a){
        res.send({"success":false,"message":"user already exists"})
    }
    const User = new user({name:userName,lastName, email:eMail, dateCreated})
    User.save().then(() => res.send({"success":true,"message":"user created"}))
})

UserRouter.post('/userLogin', async (req, res) => {
    const {loginCode}  = req.body

    const worker = await  user.findOne({loginCode : loginCode})

    const workerInBusiness = await  business.findOne({staff : worker._id})
    console.log(workerInBusiness)
    const data = {
        worker:worker,
        workerInBusiness:workerInBusiness,
    }


    res.send({"sucess":true,data})
})



export default UserRouter