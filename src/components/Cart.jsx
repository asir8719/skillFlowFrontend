import React from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2.2rem', rowGap:'1rem'}}>
        <img style={{width:'222px', height:'162px'}} src="./cartImage.webp" alt="cartImage" />
        <p>Login to see the items you added previously</p>
        <Link to='/login'><button style={{backgroundColor:'#fb641b', padding:'12px 72px', color:'#fff'}}>Login</button></Link>
    </div>
  )
}

export default Cart