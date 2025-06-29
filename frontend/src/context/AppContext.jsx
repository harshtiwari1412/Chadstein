import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {

    const [msg, setMsg] = useState('');
    const [output, setOutput] = useState([
        {
            role:'model',
            parts:"Hello! How can I help you today?"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const value = {
        msg,
        setMsg,
        output,
        setOutput,
        isLoading,
        setIsLoading
    };


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;