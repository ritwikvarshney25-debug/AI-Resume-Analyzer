import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const [search, setSearch] = useState("");

  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const totalReports = history.length;

const averageATS =
  history.length > 0
    ? Math.round(
        history.reduce(
          (sum, item) => sum + item.atsScore,
          0
        ) / history.length
      )
    : 0;

const highestATS =
  history.length > 0
    ? Math.max(
        ...history.map(
          (item) => item.atsScore
        )
      )
    : 0;

const todayReports = history.filter(
  (item) =>
    new Date(
      item.createdAt
    ).toDateString() ===
    new Date().toDateString()
).length;

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/resume/history"
      );

      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const graphData = history.map((item, index) => ({
  report: `R${index + 1}`,
  ats: item.atsScore,
}));

  const deleteHistory = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/resume/history/${id}`
    );

    // History ko dobara load karo
    fetchHistory();
  } catch (error) {
    console.log(error);
    alert("Failed to delete history");
  }
};

const filteredHistory = history.filter((item) =>
  item.fileName
    .toLowerCase()
    .includes(search.toLowerCase())
);


  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "auto",
      }}
    >
      <div
  style={{
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    padding: "25px",
    borderRadius: "20px",
    color: "white",
    marginBottom: "30px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  }}
>
  <h1
    style={{
      margin: 0,
      fontSize: "42px",
      fontWeight: "bold",
    }}
  >
    📜 Resume Analysis History
  </h1>

  <p
    style={{
      marginTop: "10px",
      fontSize: "18px",
      opacity: "0.9",
    }}
  >
    View and manage all your previous resume analysis reports.
  </p>
</div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(4,1fr)",
    gap: "20px",
    marginBottom: "30px",
  }}
>

  <div style={cardStyle}>
    <h2>📄</h2>
    <h2
  style={{
    margin: "10px 0",
    fontSize: "34px",
  }}
>
  {totalReports}
</h2>

    <p>Total Reports</p>
  </div>

  <div style={cardStyle}>
    <h2>⭐</h2>
    <h3>{averageATS}%</h3>
    <p>Average ATS</p>
  </div>

  <div style={cardStyle}>
    <h2>🏆</h2>
    <h3>{highestATS}%</h3>
    <p>Highest ATS</p>
  </div>

  <div style={cardStyle}>
    <h2>📅</h2>
    <h3>{todayReports}</h3>
    <p>Today's Reports</p>
  </div>

</div>

  <div
  style={{
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  }}
>
  <h2
    style={{
      marginBottom: "20px",
      color: "#2563eb",
    }}
  >
    📈 ATS Performance Trend
  </h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >
    <LineChart data={graphData}>
      <CartesianGrid
  strokeDasharray="5 5"
  opacity={0.4}
/>
      <XAxis
  dataKey="report"
  tick={{
    fontSize: 13,
  }}
/>

      <YAxis
  domain={[0, 100]}
  tick={{
    fontSize: 13,
  }}
/>

      <Tooltip
  contentStyle={{
    borderRadius: "10px",
    border: "none",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
  }}
/>

      <Line
  type="monotone"
  dataKey="ats"
  stroke="#2563eb"
  strokeWidth={4}
  dot={{
    r: 6,
    fill: "#2563eb",
    strokeWidth: 2,
    stroke: "#ffffff",
  }}
  activeDot={{
    r: 9,
    fill: "#22c55e",
  }}
/>
    </LineChart>
  </ResponsiveContainer>
</div>

    <div
  style={{
    marginBottom: "20px",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search Resume..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    style={{
  width: "100%",
  padding: "15px 20px",
  fontSize: "16px",
  borderRadius: "12px",
  border: "2px solid #2563eb",
  outline: "none",
  boxSizing: "border-box",
  marginBottom: "10px",
}}
  />
</div>

    <table
     style={{
     width: "100%",
     borderCollapse: "collapse",
     marginTop: "20px",
    }}
    >
    <thead>
    <tr>
    <th style={th}>Candidate</th>
    <th style={th}>Resume</th>
    <th style={th}>ATS</th>
    <th style={th}>Matched</th>
    <th style={th}>Missing</th>
    <th style={th}>Date</th>
    <th style={th}>Action</th>
  </tr>
  </thead>

    <tbody>
     {filteredHistory.map((item) => (
     <tr key={item._id}>
     <td style={td}>{item.userName}</td>

     <td style={td}>{item.fileName}</td>

     <td style={td}>
  <span
    style={{
      background:
        item.atsScore >= 80
          ? "#22c55e"
          : item.atsScore >= 50
          ? "#f59e0b"
          : "#ef4444",
      color: "white",
      padding: "6px 14px",
      borderRadius: "20px",
      fontWeight: "bold",
    }}
  >
    {item.atsScore}%
  </span>
</td>

     <td style={td}>
  <span
    style={{
      background: "#22c55e",
      color: "white",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "bold",
    }}
  >
    {item.matchedSkills.length}
  </span>
</td>

    <td style={td}>
  <span
    style={{
      background: "#ef4444",
      color: "white",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "bold",
    }}
  >
    {item.missingSkills.length}
  </span>
</td>

    <td style={td}>
      {new Date(
       item.createdAt
     ).
     toLocaleDateString()}
    </td>

     <td style={td}>
                
   <button
  onClick={() => {
    setSelectedReport(item);
    setShowModal(true);
  }}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
  }}
>
  👁 View
</button>

                <button
                 onClick={() => {
                 const confirmDelete = window.confirm(
                 "Are you sure you want to delete this report?"
                 );

                if (confirmDelete) {
                deleteHistory(item._id);
                }
               }}
                 style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                }}
                >
                🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    {showModal && selectedReport && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    }}
  >
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "15px",
        width: "700px",
        maxWidth: "90%",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "2px solid #eee",
    paddingBottom: "15px",
  }}
>
  <h2
    style={{
      margin: 0,
      color: "#2563eb",
    }}
  >
    📄 Resume Analysis Report
  </h2>

  <button
    onClick={() => setShowModal(false)}
    style={{
      background: "transparent",
      border: "none",
      fontSize: "28px",
      cursor: "pointer",
      color: "#888",
    }}
  >
    ✕
  </button>
</div>

      <hr />

      <div
  style={{
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    border: "1px solid #e5e7eb",
  }}
>
  <div style={{ marginBottom: "10px" }}>
    <strong
      style={{
        color: "#2563eb",
      }}
    >
      👤 Candidate
    </strong>

    <p
      style={{
        margin: "5px 0",
        fontSize: "18px",
        fontWeight: "600",
      }}
    >
      {selectedReport.userName}
    </p>
  </div>

  <div>
    <strong
      style={{
        color: "#2563eb",
      }}
    >
      📄 Resume
    </strong>

    <p
      style={{
        margin: "5px 0",
      }}
    >
      {selectedReport.fileName}
    </p>
  </div>
</div>

      <div
  style={{
    textAlign: "center",
    margin: "25px 0",
  }}
>
  <h3
    style={{
      color: "#666",
      marginBottom: "10px",
    }}
  >
    ATS SCORE
  </h3>

  <div
  style={{
    width: "160px",
    height: "160px",
    margin: "20px auto",
  }}
>
  <CircularProgressbar
    value={selectedReport.atsScore}
    text={`${selectedReport.atsScore}%`}
    styles={buildStyles({
      pathColor:
        selectedReport.atsScore >= 80
          ? "#22c55e"
          : selectedReport.atsScore >= 60
          ? "#f59e0b"
          : "#ef4444",

      textColor: "#2563eb",

      trailColor: "#e5e7eb",

      textSize: "18px",
    })}
  />
</div>

    <div
  style={{
    textAlign: "center",
    marginTop: "20px",
  }}
>
  <h3
    style={{
      color:
        selectedReport.atsScore >= 80
          ? "#16a34a"
          : selectedReport.atsScore >= 60
          ? "#d97706"
          : "#dc2626",
      marginBottom: "8px",
    }}
  >
    {selectedReport.atsScore >= 80
      ? "🟢 Excellent Resume"
      : selectedReport.atsScore >= 60
      ? "🟡 Good Resume"
      : "🔴 Needs Improvement"}
  </h3>

  <p
    style={{
      fontSize: "22px",
      margin: 0,
    }}
  >
    {selectedReport.atsScore >= 80
      ? "⭐⭐⭐⭐⭐"
      : selectedReport.atsScore >= 60
      ? "⭐⭐⭐⭐☆"
      : "⭐⭐☆☆☆"}
  </p>
</div>
        
        <p
  style={{
    textAlign: "center",
    color: "#6b7280",
    marginTop: "12px",
    fontSize: "15px",
  }}
>
  Resume quality based on ATS analysis
</p>

  <div
  style={{
    display: "flex",
    justifyContent: "space-around",
    margin: "25px 0",
    background: "#f8fafc",
    padding: "18px",
    borderRadius: "12px",
  }}
>
  <div style={{ textAlign: "center" }}>
    <h2 style={{ color: "#22c55e", margin: 0 }}>
      {selectedReport.matchedSkills.length}
    </h2>
    <p>Matched</p>
  </div>

  <div style={{ textAlign: "center" }}>
    <h2 style={{ color: "#ef4444", margin: 0 }}>
      {selectedReport.missingSkills.length}
    </h2>
    <p>Missing</p>
  </div>

  <div style={{ textAlign: "center" }}>
    <h2 style={{ color: "#2563eb", margin: 0 }}>
      {selectedReport.atsScore}%
    </h2>
    <p>Completion</p>
  </div>
</div>

</div>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(
          selectedReport.createdAt
        ).toLocaleString()}
      </p>

      <h3
  style={{
    color: "#16a34a",
    marginTop: "20px",
    marginBottom: "12px",
    borderBottom: "2px solid #dcfce7",
    paddingBottom: "8px",
  }}
>
  ✅ Matched Skills
</h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {selectedReport.matchedSkills.map(
          (skill, index) => (
            <span
              key={index}
              style={{
                background: "#22c55e",
                color: "white",
                padding: "8px 12px",
                borderRadius: "20px",
                fontSize: "13px",
              }}
            >
              {skill}
            </span>
          )
        )}
      </div>

      <h3
  style={{
    color: "#dc2626",
    marginTop: "25px",
    marginBottom: "12px",
    borderBottom: "2px solid #fee2e2",
    paddingBottom: "8px",
  }}
>
  ❌ Missing Skills
</h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {selectedReport.missingSkills.map(
          (skill, index) => (
            <span
              key={index}
              style={{
                background: "#ef4444",
                color: "white",
                padding: "8px 12px",
                borderRadius: "20px",
                fontSize: "13px",
              }}
            >
              {skill}
            </span>
          )
        )}
      </div>

      <button
  onClick={() => setShowModal(false)}
  style={{
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "30px",
  }}
>
  Close Report
</button>
    </div>
  </div>
)}

    </div>
  );
}

const th = {
  background: "#2563eb",
  color: "white",
  padding: "15px",
  border: "none",
  textAlign: "center",
  fontSize: "16px",
};

const td = {
  padding: "15px",
  borderBottom: "1px solid #ddd",
  textAlign: "center",
};

const cardStyle = {
  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
  color: "white",
  borderRadius: "18px",
  padding: "25px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  transition: "0.3s",
};

export default History;