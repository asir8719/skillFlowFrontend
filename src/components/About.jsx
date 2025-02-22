import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/auth'

const About = () => {

  const {data, isLoggedIn} = useAuth()
  const [name, setName] = useState('Asir Khan')
  useEffect(() =>{
    if(data && isLoggedIn){
      const {username} = data.msg
      setName(username)
    }
  }, [data, isLoggedIn])

    return (<>
    <div className='abtdv1'>
      <div className='abtdv2'>
        <h4>Welcome, {name}</h4>
        <h1>Why Choose Us?</h1>
        <p>Expertise: Our team consists of experienced IT professionals who are <br/> passionate about staying up-to-date with the latest industry trends.</p>
        <p>Customization: We understand that every business is unique. That's why <br/> we create solutions that are tailored to your specific needs and goals.</p>
        <p>Customer-Centric Approach: We prioritize you satisfaction and provide <br/> top-notch support to address your IT concerns.</p>
        <p>Affordability: We offer competitive pricing without compromising on the <br/> quality of our services.</p>
        <p>Reliability: Count on us to be there when you need us. We're committed <br/> to ensuring your IT environment is reliable and available 24/7.</p>
        <button>Connect Now</button>
        <Link to='/services'><button>Learn More</button></Link>
      </div>
      <div className='abtdv3'><img className='abtimg' src="./abtscrnsht.jpg" alt="" /></div>
    </div>
      <div className="abtdv4">
        <div><h1>50+</h1><p>Company Registers</p></div>
        <div><h1>150+</h1><p>Project Done</p></div>
        <div><h1>250+</h1><p>Happy Clients</p></div>
        <div><h1>650K+</h1><p>Youtube Subscribers</p></div>
      </div>
  </>)
}

export default About
