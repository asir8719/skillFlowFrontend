import React, { useEffect, useState } from 'react'
import '../App.css'
import { useAuth } from '../store/auth'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import gsap from 'gsap'

const Login = () => {

  const[redirect, setRedirect] = useState(false)
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  
  const {isLoggedIn, storeTokenInLS, API, setIsAdmin} = useAuth()
  const [loggedIn, setisLoggedIn] = useState(isLoggedIn)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({defaults: {duration: .24, delay:0}})
      tl.from('.lgndv1', {y: 50, opacity: 0})
      tl.from('.lgndv2 img', {y: 50, opacity: 0})
      tl.from('.lgndv3 h1', {y: 50, opacity: 0})
      tl.from('.lgndv3 form', {y: 50, opacity: 0})
    })
    return () => ctx.revert()
  }, [])
  
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
      
      
      if(response.ok){
        const result = await response.json()
        storeTokenInLS(result.token)
        setIsAdmin(result.isAdmin)
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
        <img className='lgnimg' src="../WhatsAppLogin.jpg" alt="" />
      </div>
      <div className='lgndv3'>
        <h1>Login Form</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div><label htmlFor="username">Username</label><input type="text" name='username' value={user.username} onChange={handleInput} id='username' required /></div>
          <div><label htmlFor="password">Password</label><input type="text" name='password' value={user.password} onChange={handleInput} id='password' required /></div>
          <div><button className='hmbtn' onClick={toggleAuth} type='submit'>Login Now</button></div>
        </form>
        <a style={{textDecoration:'none', color:'#2874f0'}} href="/signup">New to Skill Flow? Create an account</a>
      </div>
    </div>
  )
}

export default Login