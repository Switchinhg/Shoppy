import React, { useState } from 'react'
import {Button, TextField} from '@mui/material/';
import Logins from './Logins.module.css'
import Modals from '../Modal/Modals';

export default function Login() {
  const [open,setOpen] = useState(false)


  
  return (
    <div className={Logins.Login}>
      <Button onClick={()=> setOpen(!open)} variant="outlined" size="large">Crear Empresa</Button>

      <Modals open={open} setOpen={setOpen} title="Create Business">
        <form action="">

          <TextField id="outlined-basic" required label="Name of Business" variant="standard" sx={{margin:'1rem 0'}}/>
          <TextField type='email' required id="outlined-basic" label="Email of Owner" variant="standard" sx={{margin:'1rem 0'}}/>
          <Button type='submit' variant="text">Create</Button>

        </form>
        
      </Modals>


      <Button variant="outlined" size="large">Logearse</Button>
    </div>
  )
}
