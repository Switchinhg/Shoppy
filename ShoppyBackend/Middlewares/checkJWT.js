import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
/*  secret Key */
const  secretKey = process.env.SECRET_KEY

/* Middleware protegido  check if user send JWT*/
const checkAuth = (req,res,next)=>{

    /* buscar header auth con el jwt */
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({message:'unauthorized'})
    }
    /* Verificar JWT */
    try {
            const token = authHeader.split(' ')[1];
            const verif = JWT.verify(token, secretKey)

            if (verif.exp < Date.now() / 1000){
                /* JWT expirado */
                
            }else{
                /* se pasa el jwt para la ruta */
                req.user = verif
    
                next()
            }

         
    }
    catch{
        return res.status(401).json({message:'unauthorized'})
    }
}

export default checkAuth
