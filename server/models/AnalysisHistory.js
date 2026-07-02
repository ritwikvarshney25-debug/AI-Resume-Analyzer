const mongoose = require("mongoose");

const analysisHistorySchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    atsScore: {
      type: Number,
      required: true,
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    analyzedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AnalysisHistory",
  analysisHistorySchema
);