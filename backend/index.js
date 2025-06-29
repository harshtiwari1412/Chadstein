import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

let chatHistory = [];

app.post('/chat', async (req, res) => {

    try {
        
        const {userProblem}  = req.body;

        chatHistory.push({ role: "user", parts: [{ text: userProblem }] });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: chatHistory,
            config: {
                systemInstruction: `You are a Science Teacher. You will answer each and 
                        every query related to science only. If anyone asks 
                        some other questions not related to science, then you 
                        will reply rudely and can even roast him back.
                        For example,Are you an idiot?Ask sensible questions,etc.
                        But if he asks to lear current chat then start a new chat
                        and forget the previous context`,
                },
        });

        chatHistory.push({ role: "model", parts: [{ text: response.text }] });

        res.json({ text: response.text });

    } catch (error) {
        console.error('Chat endpoint error:', error);
        res.status(500).json({ error: 'Something went wrong with the AI chat.' });
    }
});

const port=process.env.PORT || 5000;;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});