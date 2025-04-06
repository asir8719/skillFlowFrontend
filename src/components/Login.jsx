import React, { useState } from 'react'
import '../App.css'
import { useAuth } from '../store/auth'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

  const[redirect, setRedirect] = useState(false)
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  
  const {isLoggedIn, storeTokenInLS, API} = useAuth()
  const [loggedIn, setisLoggedIn] = useState(isLoggedIn)
  
  const toggleAuth = () =>{
    setisLoggedIn((prev) => !prev)
  }
  
  const handleInput = (e) =>{
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      
      const result = await response.json()
      
      if(response.ok){
        storeTokenInLS(result.token)
        setTimeout(() =>{
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
    return <Navigate to='/about' />
  }

  return (
    <div className='lgndv1'>
      <div className='lgndv2'>
        <img className='lgnimg' src="../lgnscrnsht.jpg" alt="" />
      </div>
      <div className='lgndv3'>
        <h1>Login Form</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div><label htmlFor="username">Username</label><input type="text" name='username' value={user.username} onChange={handleInput} id='username' required /></div>
          <div><label htmlFor="password">Password</label><input type="text" name='password' value={user.password} onChange={handleInput} id='password' required /></div>
          <div><button onClick={toggleAuth} type='submit'>Login Now</button></div>
        </form>
      </div>
    </div>
  )
}

export default Login