import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const {isLoggedIn, cartItems, deleteCartItem} = useAuth()

  return (<>
    {isLoggedIn ? (<>
    <h1 style={{fontSize:'3.5rem', marginLeft:'2rem'}}>Your <span style={{color:'#6e96cf'}}>Cart</span></h1>
        {cartItems.length > 0 ? (<>
          <div className='crtdv1' style={{display:'flex', flexDirection:'row', padding:'0rem 2.2rem 2.2rem', columnGap:'1.9rem'}}>
            <div className='crtdv2' style={{display:'flex', flexDirection:'column', rowGap:'1rem'}}>
            {cartItems.map((item) => (
              <div key={item.id} style={{backgroundColor:'#fff', border:'1px solid #ccc', padding: '10px', display:'flex', gap:'2.4rem', borderRadius:'15px'}}>
                <div><img style={{objectFit:'cover', height:'121px', borderRadius:'15px'}} src={item.image} alt="cartItemimage" /></div>
                <div>
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price}</p>
                </div>
                <button onClick={() => deleteCartItem(item.id)} style={{fontSize:'large', padding:'0.5rem', width:'9rem', placeSelf:'end', marginLeft:'auto'}}>Remove <span><RiDeleteBin6Line style={{scale:'1.2'}}/></span></button>
              </div>
            ))}
            </div>
            <div className='crtdv3' style={{backgroundColor:'#fff', border:'1px solid #ccc', padding: '10px 50px 0px', display:'flex', flexDirection:'column', gap:'2.4rem', borderRadius:'15px', width:'80%', height:'fit-content'}}>
              <h1>Order Details</h1>
              <h2>Items in Cart: {cartItems.length}</h2>
              <h2>Total Price: ${cartItems.map((item) => item.price).reduce((acc, curr) => acc + curr, 0)}</h2>
              <button style={{backgroundColor:'#5a4bda', color:'white', width:'352px', padding:'20px', fontSize:'large', marginBottom:'1.5rem'}}>Pay Now</button>
            </div>
          </div>
        </>) : (<>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2.2rem', rowGap:'1rem'}}>
            <img style={{width:'222px', height:'162px'}} src="./cartImage.webp" alt="cartImage" />
            <p>Your cart is empty</p>
            <Link to='/courses'><button style={{backgroundColor:'#fb641b', padding:'12px 72px', color:'#fff'}}>Shop Now</button></Link>
          </div>
        </>)}
        </>) : (<>
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2.2rem', rowGap:'1rem'}}>
        <img style={{width:'222px', height:'162px'}} src="./cartImage.webp" alt="cartImage" />
        <p>Login to see the items you added previously</p>
        <Link to='/login'><button style={{backgroundColor:'#fb641b', padding:'12px 72px', color:'#fff'}}>Login</button></Link>
        </div>
      </>)}
  </>)
}

export default Cart