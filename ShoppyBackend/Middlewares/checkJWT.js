import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
/*  secret Key */
const  secretKey = process.env.SECRET_KEY

/* Middleware protegido  check if user send JWT*/
const checkAuth = (req,res,next)=>{

    /* buscar header auth con el jwt */
    const authHeader = req.headers.authorization
    console.log("no")
    
    if(!authHeader){
        console.log("no authentication")
        next()
        // return res.status(401).json({message:'unauthorized'})
    }
    /* Verificar JWT */
    try {
            let token = authHeader.split(' ')[1];
            console.log("entre aca")
            const result = token.slice(1, -1);
            const verif = JWT.verify(result, secretKey)


            if (verif.exp < Date.now() / 1000){
                /* JWT expirado */
                console.log("no")
            }else{
                /* se pasa el jwt para la ruta */
                req.user = verif
                console.log("ok")
                next()
            }

         
    }
    catch(e){
        console.log("erriro", e)
        // return res.status(401).json({message:'unauthorized'})
    }
}

export default checkAuth
