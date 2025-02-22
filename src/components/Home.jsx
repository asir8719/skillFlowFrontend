import React from "react"
import { Link } from "react-router-dom"

const Home = () =>{

    return (
        <>
            <div className="hmdv1">
                <div className="hmdv2">
                    <div>
                        <p>We are the World Best IT Company</p>
                        <h1>Welcome to Asir <br/> Technical</h1>
                        <p>Are you ready to take your business to the next level with cutting-edge <br/> IT solutions? Look no further! At Asir Technical, we specialize in <br/> providing innovative IT services and solutions tailored to meet your <br/> unique needs.</p>
                        <Link to='/login'><button className="hmbtn">Connect Now</button></Link>
                        <Link to='/services'><button>Learn More</button></Link>
                    </div>
                    <div><img src="./hmscrnsht.jpg"/></div>
                </div>
                <div className="hmdv3">
                    <div><h1>50+</h1><p>Registered Companies</p></div>
                    <div><h1>10000+</h1><p>Happy Clients</p></div>
                    <div><h1>500+</h1><p>Well Known Developers</p></div>
                    <div><h1>24/7</h1><p>Service</p></div>
                </div>
                <div className="hmdv4">
                    <div><img src="./hmscrnsht2.jpg" alt="" /></div>
                    <div>
                        <p>We are here to help you</p>
                        <h1>Get Started Today</h1>
                        <p>Ready to take the first step towards a more efficient and secure IT <br/> infrastructure? Connect us today for a free consultation and lets discuss <br/> how Asir Technical can help your business thrive in the digital age.</p>
                        <Link to='/contact' ><button className="hmbtn">Contact Now</button></Link>
                        <Link to='/about'><button>Learn More</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home