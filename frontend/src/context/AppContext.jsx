import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {

    const welcomeMessages = [
        "Welcome to Chadstein — your science tutor and self-esteem reducer.",
        "Ask me science. Anything else gets roasted like marshmallows.",
        "Your question might change physics — or get you obliterated.",
        "I respect Newton. Not nonsense.",
        "Hi. I’m Chadstein. I answer science and crush stupidity.",
        "This is a safe space for science. Not for feelings.",
        "Powered by E = MC². Fueled by sarcasm.",
        "I have zero chill. Ask wisely.",
        "Science is my language. Roasting is my dialect.",
        "Welcome to the roast zone. Be scientifically correct, or be destroyed.",
        ];


    const [msg, setMsg] = useState('');
    const [output, setOutput] = useState([
        {
            role:'model',
            parts:welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const value = {
        msg,
        setMsg,
        output,
        setOutput,
        isLoading,
        setIsLoading,
        welcomeMessages
    };


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;