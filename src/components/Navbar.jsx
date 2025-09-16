import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav_bar'>
        <Link  to={'/'} className="left items">Eventmate AI</Link>
        <div className="right">
        {/* <Link to={'/meal'}>Meal</Link>     */}
       <Link className="items" to={'/about'}>About</Link>
       {/* <Link className="items" to={'/courses'}>Courses</Link> */}
       <Link className="items" to={'/courses'}>Services</Link>
       <Link className="items" to={'/team'}>Team</Link>
       <Link className="items" to={'/contact'}>Contact</Link>
       <Link className='items' to={'/MainAdmin'}>Login</Link>
        </div>
    </div>
  )
}

export default Navbar