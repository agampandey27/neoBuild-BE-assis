import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import fetch from "node-fetch";


export const extractTextFromPDF = async (pdfUrl) => {
    try {
        
        const response = await fetch(pdfUrl);
        if (!response.ok) throw new Error("Failed to fetch PDF file.");
        const arrayBuffer = await response.arrayBuffer();

        const pdf = await getDocument({ data: arrayBuffer }).promise;
        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const textItems = textContent.items.map((item) => item.str);
            extractedText += textItems.join(" ") + " ";
        }

        return extractedText.trim();
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        throw new Error("Failed to extract text from PDF.");
    }
};
