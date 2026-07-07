import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function Navbar({
  darkMode,
  setDarkMode,
}) 
{
  const navigate = useNavigate();

  const location = useLocation();

  const userName =
  localStorage.getItem("name") || "Guest";
  
  const handleLogout = () => {
  localStorage.clear();

  alert("Logged Out Successfully");

  navigate("/");
};
  return (
    <div
      style={{
        width: "100%",
        background: "rgba(37,99,235,0.95)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <h2
  style={{
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  }}
>
  🤖 AI Resume Analyzer
</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link
  to="/dashboard"
  style={{
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    padding: "8px 14px",
    borderRadius: "8px",
    transition: "0.3s",
    background:
      location.pathname === "/dashboard"
        ? "rgba(255,255,255,0.25)"
        : "transparent",
  }}
>
  Dashboard
</Link>

        <Link
          to="/history"
          style={{
            color: "white",
            textDecoration: "none",
            background:
            location.pathname === "/history"? "rgba(255,255,255,0.25)": "transparent",
          }}
        >
          History
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none",
            background:
            location.pathname === "/profile"? "rgba(255,255,255,0.25)": "transparent",
          }}
        >
            <span style={{ fontSize: "18px" }}>👤</span>
          Profile
        </Link>

        <button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    background: darkMode ? "#facc15" : "#111827",
    color: darkMode ? "#111827" : "#ffffff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>

        <button
          onClick={handleLogout}
          style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
          boxShadow: "0 4px 10px rgba(239,68,68,0.3)",
}}
        >
          Logout
        </button>
      </div>
    </div>
  );
}