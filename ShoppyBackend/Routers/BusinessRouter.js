import express from 'express'

/* import Business schema */
import business from '../Models/BusinessModel.js'
import user from '../Models/UserModel.js'
import {makelogin} from '../helpers/randomNumber.js' 

const br = express.Router();

br.post('/businesses', async (req, res) => {
    const {ownerEmail ,name}  = req.body

    const login =  makelogin()

    const owner = new user({loginCode:login,role:'owner',email:ownerEmail})
    const negocio = new business({name,ownerEmail,staff:owner} )

    await owner.save().then(() => console.log('dueño agregado en bd'))
    await negocio.save().then(() => console.log('dueño agregado en negocio'))

    res.send({"sucess":true})
})

br.post('/businessesLogin', async (req, res) => {
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



export default br