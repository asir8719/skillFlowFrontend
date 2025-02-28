import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'

const Contact = () => {

  const [user, setUser] = useState({
    username: "",
    email: "",
    message: "",
  })

  const {data, isLoggedIn, API} = useAuth()
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  
  
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    try {
      const response = await fetch(`${API}/contact`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        
        const result = await response.json()
        if(response.ok){
          toast.success(result.msg)
        } else{
          toast.error(result.error)
        }
      } catch (error) {
        toast.error(error)
      }
    }
    
    const handleInput = (e) =>{
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      })
    }
    
    useEffect(() =>{
      if(data && isLoggedIn){
        const {username, email} = data.msg
        setUser({
        username,
        email,
        message: "",
        })
      } 
    }, [data, isLoggedIn])
    
  return (<>
    <div className='cntctdv1'>
      <div className='cntctdv2'>
        <h1>Contact Us</h1>
        <img className='cntctimg' src="./cntctscrnsht.jpg" />
      </div>
      <div className='cntctdv3'>
        <form onSubmit={handleSubmit}>
          <div>Username <label htmlFor="username"></label><input type="text" name='username' value={user.username} onChange={handleInput} id='username' required /></div>
          <div>Email <label htmlFor="email"></label><input type="email" name='email' value={user.email} onChange={handleInput} id='email' required /></div>
          <div>Message <label htmlFor="message"></label><textarea type="text" name='message' value={user.message} onChange={handleInput} id='message' required /></div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
      <section><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d88470.42181465405!2d88.41783005409117!3d22.67012066337267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89faa59df6903%3A0xdb1444043648b83!2sNetaji%20Subhash%20Chandra%20Bose%20International%20Airport!5e0!3m2!1sen!2sin!4v1735996504258!5m2!1sen!2sin" width="100%" height="360" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></section>
  </>)
}

export default Contact
