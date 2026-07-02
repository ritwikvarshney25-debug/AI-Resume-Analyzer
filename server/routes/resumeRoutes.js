const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const AnalysisHistory = require("../models/AnalysisHistory");


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

      console.log("Resume Text:");
      console.log(resumeText);

const keywords = [
  "python",
  "java",
  "javascript",
  "react",
  "node",
  "mongodb",
  "sql",
  "machine learning",
  "html",
  "css",
  "express.js",
  "c",
  "c++",
  "php",
  "mysql",
  "oracle sql",
  "aws",
  "azure",
  "excel",
  "power bi",
  "pandas",
  "numpy",
  "network security",
  "android development",
  "dsa",
  "generative ai",
  "linux",
  "communication skills",
  "data analytics",
  "git",
  "github"
  ];


console.log("Total Keywords:", keywords.length);
console.log("Keywords:", keywords);
let matchedKeywords = [];

keywords.forEach((keyword) => {
  if (
    resumeText.includes(
      keyword.toLowerCase()
    )
  ) {
    matchedKeywords.push(keyword);
  }
});

const atsScore = Math.round(
  (matchedKeywords.length / keywords.length) * 100
);

const missingKeywords = keywords.filter(
  (keyword) => !matchedKeywords.includes(keyword)
);

console.log("Matched:", matchedKeywords.length);
console.log("Missing:", missingKeywords.length);

await AnalysisHistory.create({
  userName: req.body.userName || "Guest",

  fileName: req.file.originalname,

  atsScore: atsScore,

  matchedSkills: matchedKeywords,

  missingSkills: missingKeywords,
});

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

// Get Analysis History
router.get("/history", async (req, res) => {
  try {
    const history = await AnalysisHistory.find()
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Delete Analysis History
router.delete("/history/:id", async (req, res) => {
  try {
    await AnalysisHistory.findByIdAndDelete(req.params.id);

    res.json({
      message: "History Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;