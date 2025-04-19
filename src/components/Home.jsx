import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import React, { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {Swiper, SwiperSlide} from "swiper/react"
import { Autoplay } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/bundle';
import { useAuth } from "../store/auth"
import { toast } from "react-toastify"
import { loadStripe } from "@stripe/stripe-js/pure"

gsap.registerPlugin(ScrollTrigger)

const Home = () =>{
    const {API} = useAuth()
    const containerRef = useRef()
    useEffect(() =>{
        const ctx = gsap.context(()  => {
            const tl = gsap.timeline({defaults: {duration: .24, delay:0}})
            tl.from('.hmdv2 h1', {y: 50, opacity: 0})
            tl.from('.hmimg1', {y: 50, opacity: 0})
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
    })
    return () => ctx.revert()
    }, [])

    const slides = [
        {
            image: "./WebDev.jpg",
            title: "Web Development Domination Course",
            description: "Build fullstack React.js applications with Node.js, Express.js & MongoDB (MERN) with this project-focused course.",
            price: "$50"
        },
        {
            image: "./AppDev.jpg",
            title: "Mobile App Development Course",
            description: "Learn to build stunning mobile applications using React Native and Expo, with a focus on real-world projects.",
            price: "$60"
        },
        {
            image: "./Blockchain.jpg",
            title: "Blockchain Development Course",
            description: "Master the fundamentals of blockchain technology and smart contract development with Ethereum and Solidity.",
            price: "$30"
        },
        {
            image: "./Graphic.jpg",
            title: "Graphic Design Mastery Course",
            description: "Unlock your creativity and learn the principles of graphic design using Adobe Photoshop and Illustrator.",
            price: "$25"
        },
        {
            image: "./Cybersecurity.jpg",
            title: "Cybersecurity Essentials Course",
            description: "Gain a comprehensive understanding of cybersecurity principles, tools, and techniques to protect digital assets.",
            price: "$55"
        },
    ]

    const makePayment = async() =>{
        const stripe = await loadStripe('process.env.stripe_public_key')
        console.log('stripe', stripe)
        try {
            const response = await fetch('http://localhost:3000/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: 1000,
                    currency: 'usd',
                    description: 'Payment for course',
                })
            })
            const data = await response.json()
            console.log(data);
            
            // if(response.ok){

            // }
        } catch (error) {
            toast.error('Error creating payment intent')
        }
    }

    return (
        <>
            <div ref={containerRef} className="hmdv1">
                <div className="hmdv2">
                    <div>
                        <h1 style={{fontSize:"4.1rem", marginTop:"0rem"}}>Welcome to Skill Flow</h1>
                        <p style={{color:'#1cdd00'}}>We are the World Best IT Company</p>
                        <p>Empower your future with the right knowledge! Our expertly designed courses provide you with the skills you need to succeed in today's fast-paced world. Whether you're looking to advance your career, explore a new passion, or gain industry-recognized certifications, we have something for everyone.</p>
                        <Link to='/login'><button className="hmbtn">Connect Now</button></Link>
                        <Link to='/about'><button className="lrnbtn">Learn More</button></Link>
                    </div>
                    <div className="hmimg1"><img src="./WhatsAppHome.jpg" alt="skillflow into"/></div>
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
                <div>
                    <h1 style={{fontSize:"3.7rem"}}>Courses Offered.</h1>
                    <Swiper
                    modules={[Autoplay]}
                    spaceBetween={90}
                    slidesPerView={3}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      breakpoints={{
                        0: {
                            slidesPerView: 1, 
                            spaceBetween: 10,
                        },
                        640: {
                          slidesPerView: 1,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 40,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 50,
                        },
                      }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >
                        {slides.map((slide, index) =>(
                            <SwiperSlide key={index}>
                                <div style={{borderRadius:'15px', padding:'20px'}} className="hmdv5">
                                    <img style={{objectFit:'cover', height:'194px'}} src={slide.image} alt="image" />
                                    <h1>{slide.title}</h1>
                                    <p>{slide.description}</p>
                                    <span style={{display:'flex', alignItems:'center', gap:'1.4rem'}}>
                                        <p style={{color:'#1cdd00'}}>Price: $99</p>
                                        <p style={{textDecoration:'line-through'}}>Price: $199</p>
                                    </span>
                                    <button onClick={makePayment}>Buy Now</button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default Home