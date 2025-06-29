import React from 'react'
import "./Navbar.css"
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Navbar() {

  const {setOutput, setMsg} = useContext(AppContext);

  function clickHandler(){
    window.location.reload();
  }


  return (
    <div className='navbar'>
      <div className='logo'>
        <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" />
        <p>Science Teacher</p>
      </div>
      <button className="newChat" onClick={clickHandler}>
          New Chat
      </button>
    </div>
  )
}

export default Navbar