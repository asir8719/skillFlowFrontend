import React, { useEffect, useState } from 'react'
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci"

const LightMode = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light'
    })

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.body.classList.toggle('light-mode', theme === 'light')
    }, [theme])

    const handleClick = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
        
    }

  return (
    <button className='ltmdbtn' onClick={handleClick}>
        {theme === 'light' ? <MdDarkMode/> : <CiLight/>}
    </button>
  )
}

export default LightMode