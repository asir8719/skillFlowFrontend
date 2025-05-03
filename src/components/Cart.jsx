import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const {isLoggedIn, cartItems, deleteCartItem, handlePayment} = useAuth()
  const totalPrice = cartItems.map((item) => item.price).reduce((acc, curr) => acc + curr, 0)

  return (<>
    {isLoggedIn ? (<>
    <h1 style={{fontSize:'3.5rem', marginLeft:'2rem'}}>Your <span style={{color:'#6e96cf'}}>Cart</span></h1>
        {cartItems.length > 0 ? (<>
          <div className='crtdv1'>
            <div className='crtdv2'>
            {cartItems.map((item) => (
              <div className='crtdv21' key={item.id}>
                <div><img style={{objectFit:'cover', height:'121px', borderRadius:'15px'}} src={item.image} alt="cartItemimage" /></div>
                <div>
                  <h2>{item.name}</h2>
                  <p>Price: ₹{item.price}</p>
                </div>
                <button onClick={() => deleteCartItem(item.id)} style={{fontSize:'large', padding:'0.5rem', width:'9rem', placeSelf:'end', marginLeft:'auto'}}>Remove <span><RiDeleteBin6Line style={{scale:'1.2'}}/></span></button>
              </div>
            ))}
            </div>
            <div className='crtdv3'>
              <h1>Order Details</h1>
              <h2>Items in Cart: {cartItems.length}</h2>
              <h2>Total Price: ₹{cartItems.map((item) => item.price).reduce((acc, curr) => acc + curr, 0)}</h2>
              <button onClick={() => handlePayment(totalPrice)} style={{backgroundColor:'#5a4bda', color:'white', width:'87%', padding:'20px', fontSize:'large', marginBottom:'1.5rem'}}>Pay Now</button>
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