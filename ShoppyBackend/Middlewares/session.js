import expressSession from 'express-session'
/*  secret Key */
import dotenv from 'dotenv'
dotenv.config()
const  secretKey = process.env.SECRET_KEY




const sessionMiddleware = expressSession({
    secret:secretKey,
    resave:false,
    saveUninitialized:false,
    cookie: {
        secure: true, // serve secure cookies
        httpOnly: true, // don't allow client-side JavaScript to access the cookie
        maxAge: 60000 * 60 // expire the session after 1 minute
    }})

    export default sessionMiddleware