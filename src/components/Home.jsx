import React from 'react'
import './Styles/homeCss.scss'
import gif from '../assets/gif.gif'
import { FaUserCheck } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import LoginForm from './LoginForm';

const Home = () => {
  return (
    <div style={{backgroundImage:`url(${gif})`,backgroundSize:"cover",backgroundPosition:'center',height:"100vh"}}>
      <div className="navbar">
        <div className="heading">
          <h1>CRUD App</h1>
        </div>
        <div className="icons">
          <FaUserCheck className='nav-icon'/>
          <RiReactjsLine className='nav-icon'/>
        </div>
      </div>
      <LoginForm />
    </div>
  )
}

export default Home
