import React, { useRef, useState } from 'react'
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci"
import gsap from 'gsap';
import { useGSAP } from "@gsap/react"

const LightMode = () => {
    const [isLightMode, setIsLightMode] = useState(false)
    const ref1 = useRef()
    const { contextSafe } = useGSAP()
    const handleClick = contextSafe(() => {
        gsap.to(ref1.current, {
            opacity: 0,
            duration:.2,
            onComplete: () => {

                setIsLightMode((preMode) => !preMode)
                document.body.classList.toggle('light-mode', !isLightMode)
                gsap.to(ref1.current, {
                    opacity:1,
                    duration:.2
                })
            }
        })
    })

  return (
    <button ref={ref1} className='ltmdbtn' onClick={handleClick}>
        {isLightMode ? <MdDarkMode/> : <CiLight/>}
    </button>
  )
}

export default LightMode