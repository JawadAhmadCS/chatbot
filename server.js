import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Initialize Groq with API key from .env
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 150
    });

    res.json({ response: chatCompletion.choices[0]?.message?.content || "No response" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
