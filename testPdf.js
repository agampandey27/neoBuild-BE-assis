/// THIS IS TESTING FILE, HAS NO CONNECTION WITH THE MAIN(PROD) CODE
/// NOTHING TO BOTHER ABOUT IS HERE :)


import { extractTextFromPDF } from "./utils/pdfExtractor.js";
import { callGeminiAPI } from "./utils/llmHelper.js";
import dotenv from 'dotenv';

dotenv.config();

const testUrl = "https://www.dhli.in/uploaded_files/resumes/resume_3404.pdf";

async function testResumeProcessing() {
    try {
        console.log("Fetching and extracting text from PDF...");
        const extractedText = await extractTextFromPDF(testUrl);

        if (!extractedText || extractedText.trim().length === 0) {
            console.error("Error: Extracted text is empty!");
            return;
        }

        console.log("Sending extracted text to LLM API...");
        const jsonResponse = await callGeminiAPI(extractedText);

        console.log("LLM Helper Response (Parsed JSON):\n", jsonResponse);

        if (!jsonResponse || typeof jsonResponse !== "object") {
            console.error("Error: LLM response is not in JSON format!");
        } else {
            console.log(" LLM Helper successfully converted text to JSON!");
        }
    } catch (error) {
        console.error(" Test Failed:", error);
    }
}

testResumeProcessing();
