import React, { useState } from 'react'
import '../App.css'
import { useAuth } from '../store/auth'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SignUp = () => {

  const [redirect, setRedirect] = useState(false)
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  })
  
  const {storeTokenInLS, API} = useAuth()
  
  const handleInput = (e) =>{
    let name = e.target.name
    let value = e.target.value
    
    setUser({
      ...user, [name]: value,
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const response = await fetch(`${API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }) 
      
      const result = await response.json()
      
      if(response.ok){
        storeTokenInLS(result.token)
        console.log(result.token);
        setTimeout(() => {
          setRedirect(true)
          toast.success(result.message)
        }, 1000) 
      } else{
        toast.error(result.error)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  if(redirect) {
    return <Navigate to='/about'/>
  }

  return (<>
    <div className='rgstrdv1'>
      <div className='rgstrdv2'><img src="../loginscrnsht.jpeg" className="rgstrimg" /></div>
      <div className='rgstrdv3'>
        <h1>Registration Form</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div><label htmlFor="username">Username</label><input type="text" name='username' id='username' value={user.username} onChange={handleInput} required /></div>
          <div><label htmlFor="email">Email</label><input type="email" name='email' id='email' value={user.email} onChange={handleInput} required /></div>
          <div><label htmlFor="phone">Phone</label><input type="number" name='phone' id='phone' value={user.phone} onChange={handleInput} required /></div>
          <div><label htmlFor="password">Password</label><input type="password" name='password' id='password' value={user.password} onChange={handleInput} required /></div>
          <div><button type='submit'>Register Now</button></div>
        </form>
      </div>
    </div>
    </>
  )
}

export default SignUp
