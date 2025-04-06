import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'


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
  }, [])
  
  return (<>
    <h1 className='srvch1'>Services</h1>
    <div className='srvcdv1'>
      {services.map((srvc) => (  
        <div key={srvc.id} className='srvcdv2'>
          <img src="./srvcscrnsht.png" alt="" />
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
