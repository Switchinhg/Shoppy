import React, { useEffect, useState } from 'react'

import {useLocation, useNavigate} from 'react-router-dom'

export default function LinkUnico() {
  const [invalidLink,setInvalidLink] = useState('')
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const key = params.get('key');
  const email = params.get('email');

  const checkMagicLink = async () =>{
    const resp = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/magikLinks`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email,
        url:key
      })
    })
    const data = await resp.json()
    if(data.success === true){
      // navigate("/success")
      localStorage.setItem("JWT", JSON.stringify(data.JWT))
      // setError("")
    }else{
      setInvalidLink(`Error: ${data.message}`)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      checkMagicLink()
    }, 3000);
  }, [])
  
  return (
    <>
    { <h1>Cargando...</h1>}
    {invalidLink}
    </>
  )
}
