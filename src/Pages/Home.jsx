import React from 'react'
import Header from "./Header"
import { Link, Outlet } from 'react-router-dom'
function Home() {
  return (
    <div>
  {/* <Header/> */}
   <Outlet/>
   </div>
  )
} 

export default Home
