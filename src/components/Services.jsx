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
    <h1 style={{fontSize:"4.1rem", marginTop:"2rem"}} className='srvch1'>Our Services</h1>
    <div className='srvcdv1'>
      {services.map((srvc) => (  
        <div key={srvc.id} className='srvcdv2'>
          <img src={srvc.image} alt="" />
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <p>{srvc.provider}</p>
            <p>{srvc.price}</p>
          </div>
          <h2>{srvc.name}</h2>
          <h4>{srvc.description}</h4>
        </div>
      ))}
    </div>
  </>
  )
}

export default Services
