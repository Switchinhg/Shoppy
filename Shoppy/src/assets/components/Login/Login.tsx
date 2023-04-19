import React, { FormEvent, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {Button, TextField} from '@mui/material/';
import Logins from './Logins.module.css'
import Modals from '../Modal/Modals';

export default function Login() {
  const navigate = useNavigate();
  const [openRegistro,setOpenRegistro] = useState(false)
  const [openLogin,setOpenLogin] = useState(false)
  const [error,setError] = useState("")


  const CrearUsuario = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    // console.log((e.currentTarget[0] as HTMLInputElement).value)/* Email */
    // console.log((e.currentTarget[1] as HTMLInputElement).value)/* Nombre */
    // console.log((e.currentTarget[2] as HTMLInputElement).value)/* Apellido */
    
      const resp = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/createUser`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          eMail:(e.currentTarget[0] as HTMLInputElement).value,
          userName:(e.currentTarget[1] as HTMLInputElement).value,
          lastName:(e.currentTarget[2] as HTMLInputElement).value,
        })
      })
      const data = await resp.json()
      if(data.success === true){
        navigate("/success")
        setError("")
      }else{
        setError(`Error: ${data.message}`)
      }

  }


  /* Si el mail esta bien, mandar mail al usuario. */
  const LoginUsuario = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    // console.log((e.currentTarget[0] as HTMLInputElement).value)/* Email */
    
      const resp = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/userLogin`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          eMail:(e.currentTarget[0] as HTMLInputElement).value,
        })
      })
      const data = await resp.json()
      if(data.success === true){
        navigate("/success")
        setError("")
      }else{
        setError(`Error: ${data.message}`)
      }

  }

  
  return (
    <div className={Logins.Login}>
      <Button onClick={()=> setOpenRegistro(!openRegistro)} variant="outlined" size="large">Crear Usuario</Button>

      <Modals open={openRegistro} setOpen={setOpenRegistro} title="Crear Usuario">
        <form action="" onSubmit={CrearUsuario}>

          {/* <TextField id="outlined-basic" required label="Nombre de usuario" variant="standard" sx={{margin:'1rem 0'}}/> */}
          <TextField id="outlined-basic" required label="Email" variant="standard" sx={{margin:'1rem 0'}} type='email'/>
          <TextField id="outlined-basic" required label="Nombre " variant="standard" sx={{margin:'1rem 0'}}/>
          <TextField id="outlined-basic" required label="Apellido " variant="standard" sx={{margin:'1rem 0'}}/>
          <p style={{color:'red'}}>{error}</p>
          <Button type='submit' variant="text">Crear</Button>

        </form>
        
      </Modals>


      <Button onClick={()=> setOpenLogin(!openLogin)} variant="outlined" size="large">Entrar</Button>

      <Modals open={openLogin} setOpen={setOpenLogin} title="Entrar">
          <p style={{fontStyle:'italic'}}>Se te enviara un enlace mágico al correo</p>
        <form action="" onSubmit={LoginUsuario}>

          <TextField id="outlined-basic" required label="Email" variant="standard" sx={{margin:'1rem 0'}} type='email'/>

          <p style={{color:'red'}}>{error}</p>
          <Button type='submit' variant="text">Entrar</Button>

        </form>
        
      </Modals>

    </div>
  )
}
