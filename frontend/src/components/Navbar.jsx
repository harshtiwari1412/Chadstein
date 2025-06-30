import React from 'react'
import "./Navbar.css"
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';


function Navbar() {

  const {setOutput, setMsg, setIsLoading, welcomeMessages} = useContext(AppContext);

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
              parts:welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
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
        <img src="/assets/Chadstein.png" />
        <p>Chadstein</p>
      </div>
      <button className="newChat" onClick={clickHandler}>
          New Chat
      </button>
    </div>
  )
}

export default Navbar