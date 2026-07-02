import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Watermark from "../assets/watermark.png";

function Dashboard() {
    const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [atsScore, setAtsScore] = useState(0);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const reportRef = useRef();
  const [showPdfReport, setShowPdfReport] = useState(false);
  const headingColor = darkMode
  ? "white"
  : "black";

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
        "http://localhost:5000/api/resume/upload",
        formData
      );

      setAtsScore(res.data.atsScore);
      setMatchedSkills(res.data.matchedKeywords || []);
      setMissingSkills(res.data.missingKeywords || []);
      setResumeText(res.data.text || "");
    } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);

  alert(
    error.response?.data?.error ||
    error.message ||
    "Upload Failed"
  );
}

    setLoading(false);
  };

  formData.append(
  "userName",
  localStorage.getItem("name")
);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const downloadReport = async () => {
  setShowPdfReport(true);

  setTimeout(async () => {
    const element = reportRef.current;

    const canvas = await html2canvas(element, {
  scale: 2,
  useCORS: true,
  allowTaint: true,
  backgroundColor: "#ffffff",
});

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight =
      (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save("AI_Resume_Report.pdf");

    setShowPdfReport(false);
  }, 500);
};

const chartData = [
  {
    name: "Skills",
    Matched: matchedSkills.length,
    Missing: missingSkills.length,
  },
];

  let rating = "";
let ratingColor = "";

if (atsScore >= 90) {
  rating = "Excellent Resume 🚀";
  ratingColor = "#22c55e";
} else if (atsScore >= 70) {
  rating = "Good Resume 👍";
  ratingColor = "#3b82f6";
} else if (atsScore >= 50) {
  rating = "Average Resume ⚠️";
  ratingColor = "#f59e0b";
} else {
  rating = "Needs Improvement ❌";
  ratingColor = "#ef4444";
}

const pieData = [
  {
    name: "Matched",
    value: matchedSkills.length,
  },
  {
    name: "Missing",
    value: missingSkills.length,
  },
];

const COLORS = [
  "#22c55e",
  "#ef4444",
];


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
    background: "linear-gradient(135deg, #e0702f, #7c3aed)",
    padding: "15px",
    borderRadius: "20px",
    textAlign: "center",
    color: "white",
    marginBottom: "30px",
    boxShadow: "0 10px 25px rgba(6, 6, 6, 0.18)",
  }}
>
  <h1
    style={{
      margin: 0,
      fontSize: "48px",
      fontWeight: "bold",
    }}
  >
    🚀 AI Resume Analyzer
  </h1>

  <p
    style={{
      fontSize: "24px",
      marginTop: "15px",
      marginBottom: "10px",
    }}
  >
    Welcome Back, {localStorage.getItem("name")} 👋
  </p>

  <p
    style={{
      fontSize: "18px",
      opacity: "0.9",
    }}
  >
    Analyze, Optimize & Improve Your Resume Instantly
  </p>
</div>

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginTop: "20px",
    marginBottom: "30px",
  }}
> 
      <button
  onClick={handleLogout}
  style={{
    backgroundColor: "#ffffff",
    color: "#ef4444",
    padding: "12px 20px",
    border: "1px solid #ef4444",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  }}
>
  🚪 Logout
</button>

      <button
  onClick={() => navigate("/profile")}
  style={{
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  }}
>
  👤 Profile
</button>

      <button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    backgroundColor: "#f3f4f6",
    color: "#111827",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  }}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
      </div>

      <h2
  style={{
    fontSize: "22px",
    color: darkMode ? "#ffffff" : "#000000",
  }}
>
  Upload Resume
</h2>

      <div
  style={{
    border: "2px dashed #2563eb",
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: darkMode ? "#1e1e1e" : "#f8fafc",
    marginBottom: "10px",
  }}
>
  <input
    type="file"
    id="resumeUpload"
    style={{ display: "none" }}
    onChange={(e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0]?.name || "");
    }}
  />

  <label
    htmlFor="resumeUpload"
    style={{
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
      color: "#2563eb",
    }}
  >
    📄 Click Here to Upload Resume
  </label>

  <p
    style={{
      marginTop: "10px",
      color: "#64748b",
    }}
  >
    PDF Resume Supported
  </p>

  {fileName && (
    <p
      style={{
        marginTop: "15px",
        fontWeight: "600",
      }}
    >
      Selected: {fileName}
    </p>
  )}
</div>

    <div
  style={{
    textAlign: "center",
    marginTop: "10px",
  }}
>
  {/* Analyze Resume Button */}
      <button
  onClick={handleUpload}
  style={{
    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "white",
    padding: "14px 35px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
    boxShadow:
      "0 8px 20px rgba(37,99,235,0.3)",
    transition: "0.3s",
  }}
>
  {loading ? "🔄 Analyzing..." : "🚀 Analyze Resume"}
</button>
</div>

<button
  onClick={() => navigate("/history")}
  style={{
    padding: "14px 18px",
    background: "#e649d9",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    marginLeft: "1px",
    fontWeight: "bold",
  }}
>
  📜 View History
</button>

{atsScore > 0 && (
  <button
    onClick={downloadReport}
    style={{
      marginTop: "15px",
      background:
        "linear-gradient(135deg,#22c55e,#16a34a)",
      color: "white",
      padding: "12px 25px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
    }}
  >
    📄 Download Report
  </button>
  )}

    <div
  ref={reportRef}
  style={{
    position: "relative",
    display: showPdfReport ? "block" : "none",
    width: "900px",
    background: "white",
    padding: "30px",
    color: "black",
  }}
>

    <img
  src={Watermark}
  alt="watermak"
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "1000px",
    opacity: "0.05",
    zIndex: 0,
    pointerEvents: "none",
  }}
/>

  <div
  style={{
    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "white",
    padding: "10px",
    borderRadius: "9px",
    textAlign: "center",
    marginBottom: "10px",
  }}
>  

  <div
  style={{
    display: "flex",
    alignItems: "center",
    height: "150px",
  }}
>
  <img
    src={Watermark}
    alt="Logo"
    style={{
      width: "150px",
      height: "150px",
      objectFit: "contain",
      marginLeft: "20px",
    }}
  />

  <div
    style={{
      flex: 1,
      textAlign: "center",
      marginRight: "120px",
    }}
  >
    <h1
      style={{
        color: "white",
        margin: 0,
        fontSize: "60px",
      }}
    >
      AI Resume Analyzer
    </h1>

    <p
      style={{
        color: "white",
        fontSize: "22px",
        marginTop: "10px",
      }}
    >
      <br />
      Professional Resume Analysis Report
    </p>
  </div>
</div>
</div>

    <div
  style={{
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  }}
>
  <h2>Candidate Details</h2>
  <p>
  <strong>ATS Rating:</strong> {rating}
</p>

  <p>
    Name: {localStorage.getItem("name")}
  </p>

  <p>
    Date: {new Date().toLocaleDateString()}
  </p>

  <p>
    Resume Length: {resumeText.length}
  </p>
</div>

    <div
  style={{
    background:
      atsScore >= 80
        ? "#22c55e"
        : atsScore >= 50
        ? "#f59e0b"
        : "#ef4444",
    color: "white",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "18px",
  }}
>
  {rating}
</div>

  <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  }}
>
  <tbody>
    <tr>
      <td
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          fontWeight: "bold",
        }}
      >
        ATS Score
      </td>

      <td
        style={{
          border: "1px solid #ddd",
          padding: "10px",
        }}
      >
        {atsScore}%
      </td>
    </tr>

    <tr>
      <td
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          fontWeight: "bold",
        }}
      >
        Matched Skills
      </td>

      <td
        style={{
          border: "1px solid #ddd",
          padding: "10px",
        }}
      >
        {matchedSkills.length}
      </td>
    </tr>

    <tr>
      <td
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          fontWeight: "bold",
        }}
      >
        Missing Skills
      </td>

      <td
        style={{
          border: "1px solid #ddd",
          padding: "10px",
        }}
      >
        {missingSkills.length}
      </td>
    </tr>
  </tbody>
</table>

      <h2
  style={{
    color: "green",
    marginTop: "20px",
  }}
>
  Matched Skills
</h2>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  }}
>
  {matchedSkills.map((skill, index) => (
    <span
      key={index}
      style={{
        background: "#22c55e",
        color: "white",
        padding: "8px 15px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
      }}
    >
      {skill}
    </span>
  ))}
</div>

      <h2
  style={{
    color: "red",
    marginTop: "20px",
  }}
>
  Missing Skills
</h2>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  }}
>
  {missingSkills.length === 0 ? (
    <span
      style={{
        background: "#22c55e",
        color: "white",
        padding: "8px 15px",
        borderRadius: "20px",
      }}
    >
      No Missing Skills 🎉
    </span>
  ) : (
    missingSkills.map((skill, index) => (
      <span
        key={index}
        style={{
          background: "#ef4444",
          color: "white",
          padding: "8px 15px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        {skill}
      </span>
    ))
  )}
</div>

  <hr />

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginTop: "70px",
    }}
  >
    <div>
      ___________________
      <br />
      Candidate Signature
    </div>

    <div>
      ___________________
      <br />
      AI Resume Analyzer
    </div>
  </div>

  <div
  style={{
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
  }}
>
  <h3>Portfolio / GitHub</h3>

  <QRCodeCanvas
    value="https://github.com/ritwikvarshney25-debug"
    size={110}
  />
</div>

  <div
  style={{
    marginTop: "20px",
    paddingTop: "15px",
    borderTop: "2px solid #2563eb",
    textAlign: "center",
    color: "#666",
  }}
>

    <p
  style={{
    textAlign: "right",
    fontSize: "12px",
  }}
>
  Page 1 of 1
</p>

  Generated on: {new Date().toLocaleString()}

  <br />

  AI Resume Analyzer © 2026 | Developed by Ritwik Varshney
</div>

  <br />

</div>

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
    display: "grid",
    gridTemplateColumns: "220px 220px 220px",
    justifyContent: "center",
    gap: "12px",
    marginTop: "20px",
    marginBottom: "20px",
  }}
>
  {/* ATS Score Card */}
  <div
    style={{
      background: "#dbeafe",
      padding: "10px",
      borderRadius: "15px",
      textAlign: "center",
      height: "130px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h3
      style={{
        fontSize: "16px",
        marginBottom: "10px",
      }}
    >
      🎯 ATS Score
    </h3>

    <div
      style={{
        width: "55px",
        height: "55px",
        margin: "0 auto",
      }}
    >
      <CircularProgressbar
        value={atsScore}
        text={`${atsScore}%`}
        styles={buildStyles({
          textSize: "20px",
          pathColor:
            atsScore >= 80
              ? "#22c55e"
              : atsScore >= 50
              ? "#f59e0b"
              : "#ef4444",
          textColor: "#111827",
          trailColor: "#d1d5db",
        })}
      />
    </div>
  </div>

  {/* Matched Skills Card */}
  <div
    style={{
      background:
  "linear-gradient(135deg,#dcfce7,#bbf7d0)",
      padding: "10px",
      borderRadius: "15px",
      textAlign: "center",
      height: "130px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h3
      style={{
        fontSize: "16px",
        marginBottom: "10px",
      }}
    >
      ✅ Matched Skills
    </h3>

    <h1
      style={{
        fontSize: "32px",
        margin: "0",
      }}
    >
      {matchedSkills.length}
    </h1>
  </div>

  {/* Missing Skills Card */}
  <div
    style={{
      background:
  "linear-gradient(135deg,#fee2e2,#fecaca)",
      padding: "10px",
      borderRadius: "15px",
      textAlign: "center",
      height: "130px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h3
      style={{
        fontSize: "16px",
        marginBottom: "10px",
      }}
    >
      ❌ Missing Skills
    </h3>

    <h1
      style={{
        fontSize: "32px",
        margin: "0",
      }}
    >
      {missingSkills.length}
    </h1>
  </div>
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
        <div
  style={{
    marginTop: "20px",
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  }}
>
  <h2
  style={{
    fontSize: "21px",
    color: darkMode ? "#ffffff" : "#000000",
  }}
>
  📋 Resume Summary
</h2>


  <p>
    <strong>ATS Score:</strong> {atsScore}%
  </p>

  <p>
    <strong>Matched Skills:</strong> {matchedSkills.length}
  </p>

  <p>
    <strong>Missing Skills:</strong> {missingSkills.length}
  </p>

  <h3
    style={{
      color:
        atsScore >= 80
          ? "#22c55e"
          : atsScore >= 50
          ? "#f59e0b"
          : "#ef4444",
    }}
  >
    {atsScore >= 80
      ? "Excellent Resume ✅"
      : atsScore >= 50
      ? "Good Resume 👍"
      : "Needs Improvement ⚠️"}
  </h3>
</div>

  <h2
  style={{
    fontSize: "22px",
    color: darkMode ? "#ffffff" : "#000000",
  }}
>
  🧭 Skills Distribution
</h2>

<ResponsiveContainer width="100%" height={220}>
  <PieChart>
    <Pie
  data={pieData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={85}
  fill="#8884d8"
  label={false}
>
      {pieData.map((entry, index) => (
        <Cell
          key={index}
          fill={COLORS[index]}
        />
      ))}
    </Pie>

    <Legend />
  </PieChart>
</ResponsiveContainer>
  <h2 style={{ color: headingColor }}>
  📄 Resume Content
</h2>

  <p>
    Resume Length: {resumeText.length} Characters
  </p>

  <textarea
    value={resumeText}
    readOnly
    rows="12"
    style={{
      width: "100%",
      padding: "15px",
      borderRadius: "10px",
      border: "1px solid #1c99b5",
      marginTop: "10px",
    }}
  />
</div>

<hr />

<p
  style={{
    textAlign: "center",
    marginTop: "20px",
    opacity: "0.8",
  }}
>
  AI Resume Analyzer © 2026 | Developed by Ritwik Varshney
</p>

</div>

);
}

export default Dashboard;