const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("resume"),
  async (req, res) => {
    try {
      console.log(req.file);
      if (!req.file) {
  return res.status(400).json({
    error: "No file uploaded",
  });
}

      const dataBuffer = fs.readFileSync(req.file.path);

      const pdfData = await pdfParse(dataBuffer);
      const resumeText = pdfData.text.toLowerCase();

const keywords = [
  "Python",
  "Java",
  "Javascript",
  "React.js",
  "Node.js",
  "MongoDB",
  "SQL",
  "Machine Learning",
  "HTML",
  "CSS",
  "Express.js",
  "C",
  "C++",
  "PHP",
  "Node.js",
  "MySQL",
  "Oracle SQL",
  "Amazon Web Services (AWS)",
  "Microsoft Azure",
  "Excel",
  "Power BI",
  "Python (Pandas, NumPy)",
  "Network Security",
  "Android Development",
  "DSA",
  "Generative AI",
  "Linux",
  "Communication Skills",
  "Data Analytics",
  "Git & GitHub",

];

let matchedKeywords = [];

keywords.forEach((keyword) => {
  if (resumeText.includes(keyword)) {
    matchedKeywords.push(keyword);
  }
});

const atsScore = Math.round(
  (matchedKeywords.length / keywords.length) * 100
);

const missingKeywords = keywords.filter(
  (keyword) => !matchedKeywords.includes(keyword)
);

res.status(200).json({
  message: "Resume Uploaded Successfully",
  file: req.file.filename,
  atsScore,
  matchedKeywords,
  missingKeywords,
  text: pdfData.text,
});

    } catch (error) {
      console.log("PDF ERROR:", error);

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;