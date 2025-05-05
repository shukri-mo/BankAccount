import React from 'react'
import Header from "./Header"
import { Link, Outlet } from 'react-router-dom'
function Home() {
  return (
    <>
   <header>
    <nav>
        <ul>
            <li><Link to='login'>Create Account</Link></li>
            <li><Link to="account">Account</Link></li>
        </ul>
    </nav>
   </header>
   <Outlet/>
   </>
  )
} 

export default Home
