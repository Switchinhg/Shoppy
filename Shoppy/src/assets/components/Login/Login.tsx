import React, { FormEvent, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {Button, TextField} from '@mui/material/';
import Logins from './Logins.module.css'
import Modals from '../Modal/Modals';

export default function Login() {
  const navigate = useNavigate();
  const [open,setOpen] = useState(false)

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
      }

  }

  
  return (
    <div className={Logins.Login}>
      <Button onClick={()=> setOpen(!open)} variant="outlined" size="large">Crear Usuario</Button>

      <Modals open={open} setOpen={setOpen} title="Crear Usuario">
        <form action="" onSubmit={CrearUsuario}>

          {/* <TextField id="outlined-basic" required label="Nombre de usuario" variant="standard" sx={{margin:'1rem 0'}}/> */}
          <TextField id="outlined-basic" required label="Email" variant="standard" sx={{margin:'1rem 0'}} type='email'/>
          <TextField id="outlined-basic" required label="Nombre " variant="standard" sx={{margin:'1rem 0'}}/>
          <TextField id="outlined-basic" required label="Apellido " variant="standard" sx={{margin:'1rem 0'}}/>
          <Button type='submit' variant="text">Crear</Button>

        </form>
        
      </Modals>


      <Button variant="outlined" size="large">Entrar</Button>
    </div>
  )
}
