import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"
import React, { useRef } from "react"
import { Link } from "react-router-dom"
gsap.registerPlugin(ScrollTrigger)

const Home = () =>{
    const containerRef = useRef()
    useGSAP(() =>{
        const tl = gsap.timeline({defaults: {duration: .3, delay:0}})
        tl.from('.hmdv2 h1', {y: 50, opacity: 0})
        tl.from('.hmdv2 p', {y: 50, opacity: 0})
        tl.from('.hmdv2 button', {y: 50, opacity: 0})

        gsap.from('.hmdv3 div', {
            y: 50,
            opacity: 0,
            duration: .7,
            scrollTrigger: {
                trigger: '.hmdv3',
                scroller: "body",
                start: 'top 60%',
                markers: false,
                end: 'bottom 10%',
            }
        })
        const tl2 = gsap.timeline({
            defaults: {duration:.2, delay:0},
            scrollTrigger: {
                trigger: '.hmdv4',
                scroller: "body",
                start: 'top 50%',
                markers: false,
                end: 'bottom 10%',
            }    
        })
        tl2.from('.hmp1', {y: 50, opacity: 0})
        tl2.from('.hmh1', {y: 50, opacity: 0})
        tl2.from('.hmp2', {y: 50, opacity: 0})
        tl2.from('.hmdv4 button', {y: 50, opacity: 0})
    }, {scope: containerRef, revertOnUpdate: true})

    return (
        <>
            <div ref={containerRef} className="hmdv1">
                <div className="hmdv2">
                    <div>
                        <h1 style={{fontSize:"4.1rem", marginTop:"0rem"}}>Welcome to Skill Flow</h1>
                        <p style={{color:'#1cdd00'}}>We are the World Best IT Company</p>
                        <p>Empower your future with the right knowledge! Our expertly designed courses provide you with the skills you need to succeed in today's fast-paced world. Whether you're looking to advance your career, explore a new passion, or gain industry-recognized certifications, we have something for everyone.</p>
                        <Link to='/login'><button className="hmbtn">Connect Now</button></Link>
                        <Link to='/services'><button className="lrnbtn">Learn More</button></Link>
                    </div>
                    <div><img src="./WhatsAppHome.jpg" alt="skillflow into"/></div>
                </div>
                <div className="hmdv3">
                    <div><h1>50+</h1><p>Registered Companies</p></div>
                    <div><h1>10000+</h1><p>Happy Clients</p></div>
                    <div><h1>500+</h1><p>Well Known Developers</p></div>
                    <div><h1>24/7</h1><p>Service</p></div>
                </div>
                <div className="hmdv4">
                    <div className="hmImg"><img src="./Home.png" alt="skillflow home"/></div>
                    <div>
                        <p className="hmp1" style={{color:'#1cdd00'}}>We are here to help you</p>
                        <h1 className="hmh1" style={{fontSize:"4.1rem"}}>Get Started Today</h1>
                        <p className="hmp2">Learn at your own pace, from anywhere, with top-notch instructors and real-world projects. Join thousands of learners who are transforming their lives—because investing in yourself is the best decision you'll ever make!</p>
                        <Link to='/contact' ><button className="hmbtn">Contact Now</button></Link>
                        <Link to='/about'><button className="lrnbtn">Learn More</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home