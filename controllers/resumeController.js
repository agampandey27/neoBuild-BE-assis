import { extractTextFromPDF } from "../utils/pdfExtractor.js";
import { callGeminiAPI } from "../utils/llmHelper.js";
import {Applicant} from "../models/applicant.model.js";

export const processResume = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "PDF URL is required" });
        }

        const extractedText = await extractTextFromPDF(url);
        if (!extractedText) {
            return res.status(500).json({ error: "Failed to extract text from PDF" });
        }

        const structuredData = await callGeminiAPI(extractedText);

        if (!structuredData) {
            return res.status(500).json({ error: "Failed to process resume data" });
        }

        const newApplicant = new Applicant(structuredData);
        await newApplicant.save();

        return res.status(200).json({
            message: "Resume processed successfully",
            data: structuredData
        });

    } catch (error) {
        console.error("Error processing resume:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const searchResume = async (req, res) => {
    try {
        
      const { name } = req.body;
      if (!name) return res.status(400).json({ message: "Name query is required" });
  
      const regex = new RegExp(name, "i");
      const results = await Applicant.find({ name: regex });
  
      if (results.length === 0) return res.status(404).json({ message: "No matching resumes found" });
  
      return res.status(200).json({ results });
    } catch (error) {
      console.error("Error searching resumes:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
