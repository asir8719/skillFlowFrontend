import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/auth'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const About = () => {
  
  const {data, isLoggedIn} = useAuth()
  const [name, setName] = useState('')
  useEffect(() =>{
    if(data && isLoggedIn){
      const {username} = data.msg
      setName(username)
    }
  }, [data, isLoggedIn])

  useEffect(() => {
    const ctx = gsap.context(()  => {
      const tl = gsap.timeline({defaults: {duration: .23, delay:0}})
      tl.from('.abtdv2 h4', {y: 50, opacity: 0})
      tl.from('img', {y: 50, opacity: 0})
      tl.from('.abtdv2 h1', {y: 50, opacity: 0})
      tl.from('.abtdv2 p', {y: 50, opacity: 0})
    })
    gsap.from('.hmbtn', {
      y:50,
      opacity: 0,
      duration: .7,
      scrollTrigger: {
        trigger: '.abtdv3',
        scroller: 'body',
        start: 'top 10%',
        markers: false,
      }
    })
    gsap.from('.abtdv4', {
      y: 50,
      opacity: 0,
      duration: .7,
      scrollTrigger: {
        trigger: '.abtdv4',
        scroller: 'body',
        start: 'top 80%',
        markers: false,
      }
    })

    return () => ctx.revert()
  }, [])

    return (<>
    <div className='abtdv1'>
      <div className='abtdv2'>
        <h4 style={{color:'#1cdd00', fontSize:'x-large'}}>Welcome, {name}</h4>
        <h1 style={{fontSize:"4.1rem"}}>Why Choose Us?</h1>
        <p>Expertise: Our team consists of experienced IT professionals who are <br/> passionate about staying up-to-date with the latest industry trends.</p>
        <p>Customization: We understand that every business is unique. That's why <br/> we create solutions that are tailored to your specific needs and goals.</p>
        <p>Customer-Centric Approach: We prioritize you satisfaction and provide <br/> top-notch support to address your IT concerns.</p>
        <p>Affordability: We offer competitive pricing without compromising on the <br/> quality of our services.</p>
        <p>Reliability: Count on us to be there when you need us. We're committed <br/> to ensuring your IT environment is reliable and available 24/7.</p>
        <Link to='/signup'><button className='hmbtn'>Connect Now</button></Link>
      </div>
      <div className='abtdv3'><img className='abtimg' src="./WhatsAppAbout.jpg" alt="" /></div>
    </div>
      <div className="abtdv4">
        <div><h1>50+</h1><p>Company Registers</p></div>
        <div><h1>150+</h1><p>Project Done</p></div>
        <div><h1>250+</h1><p>Happy Clients</p></div>
        <div><h1>650K+</h1><p>Youtube Subscribers</p></div>
      </div>
      <div className='abtdv5' style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <h1 style={{fontSize:'4.1rem', fontWeight:'200', textAlign:'center', margin:'10rem 0 6rem 0'}}>Top <span style={{color:'#24cfa6'}}>Companies</span> Our Students <br/> working with</h1>
        <img style={{objectFit:'cover', width:'640px', margin:'2rem 0 6rem 0'}} src="./companies.webp" alt="companies image" />
      </div>
      <div className='abtdv6' style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <h1 style={{fontSize:'4.1rem', fontWeight:'200', textAlign:'center', margin:'8rem 0 6rem 0'}}>Our <span style={{color:'#24cfa6'}}>Vision</span></h1>
        <h1 style={{fontSize:'5.1rem', fontWeight:'200', textAlign:'center', margin:'0 0 6rem'}}>We only <span style={{color:'#24cfa6'}}>teach</span> <br /> what we are really <br /> really good at.</h1>
        <p style={{width:'60%', textAlign:'center', fontSize:'2.5rem', fontWeight:'100'}}>We aim to create a global community of learners who are equipped to tackle the challenges of tomorrow, fostering innovation, creativity, and lifelong learning.</p>
      </div>
  </>)
}

export default About
