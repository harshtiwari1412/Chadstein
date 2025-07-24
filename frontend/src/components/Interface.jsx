import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Spinner from './Spinner';
import Navbar from './Navbar';
import {FaPaperPlane} from 'react-icons/fa'
import "./Interface.css"
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';


function Interface() {

    const {msg, setMsg, output, setOutput, isLoading, setIsLoading} = useContext(AppContext);

    const outputRef = useRef(null);
    const [shouldScroll, setShouldScroll] = useState(false);

    useEffect(() => {
        if (shouldScroll && outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
            setShouldScroll(false);
        }
    }, [output, shouldScroll]);

    async function clickHandler() {
        if (!msg.trim() || isLoading) return;
        setIsLoading(true);
        setOutput(prev => [
            ...prev,
            {
                role: 'user',
                parts: msg,
            }
        ]);
        setShouldScroll(true);

        setMsg('');
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
                userProblem: msg,
            });

            setOutput((prev) => [
                ...prev,
                {
                    role: 'model',
                    parts: response.data.text,
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
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className='interface'>
            <Navbar></Navbar>
            <div className='chats'>
            <div className="output" ref={outputRef}>
                {
                    output.map((data,index) => {
                        return (
                            <div key={index} className={`${data.role} bubble`} >
                                <div className="bubble-content">
                                    <ReactMarkdown>{data.parts}</ReactMarkdown>
                                    </div>
                                </div>
                        )
                    })
                }
                {
                    isLoading ? <div className='spinner-container'> <br></br> <Spinner></Spinner> <br /> </div> : <div></div>
                }
            </div>
            <div className='input'>
            <input type="text" placeholder='Enter Text'
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
                onKeyDown={(e)=> {
                            if (e.key === 'Enter') 
                                clickHandler();
                            }
                        }    
            />
            <button onClick={clickHandler}>
                <FaPaperPlane></FaPaperPlane>
            </button>
            </div>
            </div>
        </div>
    )
}

export default Interface