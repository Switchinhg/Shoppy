import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

/* JWT  */
import JWT from 'jsonwebtoken'
const  secretKey = process.env.SECRET_KEY
const expTime = "1w"
/* ----- */

/* import Business schema */
import user from '../Models/UserModel.js'
import sessionMiddleware from '../Middlewares/session.js'

/* Nodemailer */

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
})




/* ---------- */
const UserRouter = express.Router();


//TODO TESTEAR
UserRouter.use(sessionMiddleware)

UserRouter.post('/createUser', async (req, res) => {
    const {userName,lastName ,eMail}  = req.body
    const dateCreated = new Date().toLocaleString()

    const a = await user.findOne({email:eMail})
    if(a){
        return res.send({"success":false,"message":"user already exists"})
    }
    const User = new user({name:userName,lastName, email:eMail, dateCreated})
    User.save().then(() => res.send({"success":true,"message":"user created"}))
})



UserRouter.post('/userLogin', async (req, res) => {
    const {eMail}  = req.body
    console.log(eMail)
    const userFound = await  user.findOne({email:eMail})
    console.log(userFound)
    if(userFound){

        const timestamp = Date.now().toLocaleString()
        const JasonWebToken = JWT.sign({eMail,timestamp},secretKey,{expiresIn:expTime})
        
        //TODO ver como hacer el link magico, pensado: hacer un frontend.com/success/JWT 
        //TODO y en el frontend usar params y guardar el JWT
        let mailOptions={
            from:`${process.env.EMAIL}`,
            to:eMail,
            subject:'CUENTA CRADA EN SHOPPY.GG',
            text:'Creaste correctamente tu cuenta en FocusG! muchas gracias!',
            // TODO EDITAR HTML
            html: 
                `<div style="background-color: rgb(175, 255, 238);margin: 0 auto;text-align: center; padding: 2rem 0;">
                        <h1>Bienvenido a shoppy.gg!</h1>
                        <p>Este es tu link para entrar a tu cuenta!</p>
                        <a href="${process.env.FRONTEND}/success/${JasonWebToken}" target="_blank" >Click aquí!</a>
                </div>
                ` 
        }
        /* manda el mail */
        transporter.sendMail(mailOptions, function(err,info){
            if(err){
                console.log(err)
            }
            else{
                console.log('Mail enviado', info.response)
            }
        })

    }
    

    // res.send({"sucess":true,data})
})



export default UserRouter