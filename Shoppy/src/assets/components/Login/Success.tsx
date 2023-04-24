import React from 'react'

import {useParams} from 'react-router-dom'

export default function Success() {
  const jwt = useParams()
  console.log(jwt)
  console.log("hola")
  return (
    <div>asdsad</div>
  )
}
