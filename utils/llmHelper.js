import dotenv from 'dotenv';

dotenv.config();

import fetch from "node-fetch";

export const callGeminiAPI = async (resumeText) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const prompt = `Extract key resume details and return in JSON format:
{
  "name": "",
  "email": "",
  "education": { "degree": "", "branch": "", "institution": "", "year": "" },
  "experience": { "job_title": "", "company": "", "start_date": "", "end_date": "" },
  "skills": [],
  "summary": ""
}
Return only JSON and no extra text.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${prompt}\n\nResume:\n${resumeText}` }]
                }]
            })
        });

        const data = await response.json();

        if (!data || !data.candidates || data.candidates.length === 0) {
            return null;
        }

        let llmText = data.candidates[0]?.content?.parts[0]?.text || "";

        llmText = llmText.replace(/```json\n|\n```/g, "").trim();

        return JSON.parse(llmText);
    } catch (error) {
        console.error("LLM API Error:", error);
        return null;
    }
};