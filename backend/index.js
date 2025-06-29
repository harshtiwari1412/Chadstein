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
                systemInstruction: process.env.INSTRUCTION,
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