import React from 'react'
import "./Navbar.css"
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';


function Navbar() {

  const {setOutput, setMsg, setIsLoading} = useContext(AppContext);

  async function clickHandler(){
        setIsLoading(true);
        setMsg('');
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
                userProblem: 'Clear current context',
            });
          setOutput([
            {
              role:'model',
              parts:"Hello! How can I help you today?"
            }
          ]);
        } catch (error) {
            setOutput((prev) => [
                ...prev,
                {
                    role: 'model',
                    parts: 'Oops! Something went wrong. Please try again.',
                }
            ]);
        }
        finally {
            setIsLoading(false);
        }
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