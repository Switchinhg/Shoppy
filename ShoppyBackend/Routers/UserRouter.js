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
import { MagikLink } from '../helpers/magikLink.js'

/* Nodemailer */

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
})


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
        
        if(userFound.magiklink && userFound.magiklink.expiracion > Date.now()){
            console.log("ya hay uno existente")
            return res.send({"success":false,"message":"Ya hay un link magico activo"})
        }
        if(userFound.magiklink && userFound.magiklink.expiracion < Date.now()){
            userFound.magiklink = null
            console.log("borrado")
        }
        
        const link = MagikLink()
        link.JWT = JasonWebToken
        link.used = false

        userFound.magiklink = link
        

        await userFound.save()


        let mailOptions={
            from:`${process.env.EMAIL}`,
            to:eMail,
            subject:'Enlace para entrar a SHOPPY.GG',
            text:'Creaste correctamente tu cuenta en FocusG! muchas gracias!',
            // TODO EDITAR HTML
            html: 
                `
                <div style="background-color: rgb(175, 255, 238);margin: 0 auto;text-align: center; padding: 2rem 0;">
                        <h1>Bienvenido a shoppy.gg!</h1>
                        <p>Este es tu link para entrar a tu cuenta!</p>
                        <a href="${process.env.FRONTEND}/link?key=${link.url}&email=${eMail}" target="_blank" >Click aquí!</a>
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
    

    res.send({"success":true,"message":"ok"})
})

//TODO QUEDE ACA 26/4
UserRouter.post('/magikLinks', async (req,res)=>{
    const {url,email} = req.body

    console.log(url,email)

    const userFound = await  user.findOne({email})
    console.log(userFound)
    if(userFound.magiklink?.url !== url || userFound.magiklink?.expiracion < Date.now()){
        console.log('entro en if')
        res.send({"success":false,"message":"datos erroneos o link caducado"})
    }else{
        console.log('entro en else')
        userFound.magiklink = null

        await userFound.save()

        // res.send({"success":true,JWT:userFound.magiklink.JWT})
    }


})

export default UserRouter