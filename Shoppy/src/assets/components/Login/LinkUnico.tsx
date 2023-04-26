import React from 'react'

import {useLocation} from 'react-router-dom'

export default function LinkUnico() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const key = params.get('key');
  return (
    <div>HOlaaaa {key?key:null}</div>



    /* 
    
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const key = params.get('key');
    
    */
  )
}
