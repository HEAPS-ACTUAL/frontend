const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const openai = require("openai");
const cors = require("cors");
const app = express();

// Set up multer for memory storage (does not save file to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    // Extract text from the PDF buffer
    const text = await pdfParse(req.file.buffer);

    // Generate questions using OpenAI's API
    const questions = await generateQuestions(text.text);

    res.json({ questions });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to process PDF");
  }
});

async function generateQuestions(text) {
  const response = await openai.Completion.create({
    engine: "text-davinci-003", // Ensure you use the correct engine name
    prompt: `Generate questions based on the following text:\n${text}`,
    max_tokens: 150,
  });

  return response.choices[0].text.trim();
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
