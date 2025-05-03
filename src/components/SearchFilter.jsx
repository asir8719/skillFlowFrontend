import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'

const SearchFilter = ({sortedData}) => {
  const {setSortedServices} = useAuth()
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    const searchFilter = sortedData.filter((item) => 
      item.name.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
      item.description.trim().toLowerCase().includes(search.trim().toLowerCase())
    )
    setSortedServices(searchFilter)
  }, [search])

  return (
    <>
      <input style={{width:'50%', height:'2rem', fontSize:'large', borderRadius:'.7rem',paddingLeft:'1rem'}} type="text" name="search" id="search" placeholder='Search Courses' value={search} onChange={(e) => setSearch(e.target.value)} />
    </>
  )
}

export default SearchFilter