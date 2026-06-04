import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [atsScore, setAtsScore] = useState(0);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "https://ai-resume-analyzer-c1px.onrender.com/api/resume/upload",
        formData
      );

      setAtsScore(res.data.atsScore);
      setMatchedSkills(res.data.matchedKeywords || []);
      setMissingSkills(res.data.missingKeywords || []);
      setResumeText(res.data.text || "");
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "auto",
        fontFamily: "Arial",
        backgroundColor: darkMode ? "#393838" : "white",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            fontSize: "40px",
          }}
        >
          AI Resume Analyzer
        </h1>

        <p
          style={{
            color: "gray",
            fontSize: "18px",
          }}
        >
          Upload your resume and get ATS score instantly
        </p>
      </div>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "white",
          color: "red",
          padding: "10px 15px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
          marginRight: "10px",
        }}
      >
        🚪 Logout
      </button>

      <button
  onClick={() => (window.location.href = "/profile")}
  style={{
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
  }}
>
  👤 Profile
</button>

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h2>Upload Resume</h2>

      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setFileName(e.target.files[0]?.name || "");
        }}
      />

      {fileName && (
        <p>
          Selected File: <strong>{fileName}</strong>
        </p>
      )}

      <br />
      <br />

      <button
        onClick={handleUpload}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {loading && (
        <p
          style={{
            color: "#2563eb",
            marginTop: "10px",
          }}
        >
          Processing Resume...
        </p>
      )}

      <hr />

      <div
        style={{
          padding: "25px",
          marginTop: "20px",
          width: "300px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0px 4px 12px rgba(7,0,0,0.2)",
          backgroundColor: darkMode ? "#2f2e2e" : "#d0dfed",
        }}
      >
        <h2>ATS Score</h2>

        <h1
          style={{
            fontSize: "60px",
            color:
              atsScore >= 80
                ? "#22c55e"
                : atsScore >= 50
                ? "#f59e0b"
                : "#ef4444",
          }}
        >
          {atsScore}%
        </h1>

        <p>
          {atsScore >= 80
            ? "Excellent Resume"
            : atsScore >= 50
            ? "Good Resume"
            : "Needs Improvement"}
        </p>
      </div>

      <div
        style={{
          padding: "20px",
          marginTop: "20px",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
          backgroundColor: darkMode ? "#1e1e1e" : "#f8f9fa",
        }}
      >
        <h2>Resume Statistics</h2>

        <p>✅ Matched Skills: {matchedSkills.length}</p>
        <p>❌ Missing Skills: {missingSkills.length}</p>
        <p>📄 Resume Length: {resumeText.length} Characters</p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "50px",
          marginTop: "20px",
        }}
      >
        <div>
          <h2>Matched Skills ✅</h2>

          {matchedSkills.map((skill, index) => (
            <span
              key={index}
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "8px 12px",
                borderRadius: "20px",
                margin: "5px",
                display: "inline-block",
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        <div>
          <h2>Missing Skills ❌</h2>

          {missingSkills.map((skill, index) => (
            <span
              key={index}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "8px 12px",
                borderRadius: "20px",
                margin: "5px",
                display: "inline-block",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <hr />

      <h2>Resume Content</h2>

      <textarea
        value={resumeText}
        readOnly
        rows="12"
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #eaa0a0",
          backgroundColor: "#74a7d9",
        }}
      />

      <hr />

      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          opacity: "0.8",
        }}
      >
        Built by Ritwik Varshney
      </p>
    </div>
  );
}

export default Dashboard;