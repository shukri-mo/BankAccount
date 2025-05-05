import React from 'react'
import Header from "./Header"
import { Link, Outlet } from 'react-router-dom'
function Home() {
  return (
    <div>
  <Header/>
  {/* <h3 className='text-5xl text-center pt-10 pb-15 text-white'>WELCOME!</h3> */}
   <Outlet/>
   </div>
  )
} 

export default Home
