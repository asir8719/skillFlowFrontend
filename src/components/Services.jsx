import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'
import gsap from 'gsap'


const Services = () => {
  
  const [services, setServices] = useState([])
    const [refresh, setRefresh] = useState(false)
    const {API} = useAuth()

  const fetchServiceData = async() =>{
    try {
      const response = await fetch(`${API}/services`, {
        method: 'GET',
      })
      const data = await response.json()
      if(response.ok){
        const {msg: serviceData} = data
        setServices(serviceData)
        setRefresh(!refresh)
      } else{
        toast.error(data.error)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() =>{
    fetchServiceData()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({defaults: {duration: .3, delay:0}})
      tl.from('.srvch1', {y: 50, opacity: 0})
      tl.from('.srvcdv1', {y: 50, opacity: 0})
      tl.from('.srvcdv2', {y: 50, opacity: 0})
    })
    return () => ctx.revert()
  }, [])
  
  return (<>
    <h1 style={{fontSize:"4.1rem", marginTop:"2rem"}} className='srvch1'>Our <span style={{color:'#6e96cf'}}>Courses</span></h1>
    <div style={{marginLeft:'4rem'}}>
      <p style={{fontSize:"3.7rem", marginTop:"1rem"}}>We are not a <span style={{color:'#24cfa6'}}>Course <p>Factory.</p></span></p>
      <p style={{fontSize:"2.2rem"}}>We focus on courses that really help.</p>
    </div>
    <div className='srvcdv1'>
      {services.map((srvc) => (  
        <div style={{borderRadius:'15px'}} className="srvcdv2">
          <img style={{objectFit:'cover',width:'auto', height:'194px'}} src={srvc.image} alt="image" />
          <div style={{padding:'1rem'}}>
            <h1>{srvc.title}</h1>
            <p>{srvc.description}</p>
            <span style={{display:'flex', justifyContent:'left', alignItems:'center', gap:'1.4rem'}}>
                <p style={{color:'#1cdd00'}}>Price: $99</p>
                <p style={{textDecoration:'line-through'}}>Price: $199</p>
            </span>
            <button>Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  </>
  )
}

export default Services
