import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://ai-resume-analyzer-c1px.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      alert(res.data.message);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", "Ritwik");

      window.location.href = "/dashboard";
    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #2563eb, #7c3aed)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "1000px",
          maxWidth: "100%",
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
        }}
      >
        <div

  style={{
    flex: 1,
    padding: "50px",
    minWidth: "420px",
  }}
>
          <h1
  style={{
    marginBottom: "15px",
    color: "#111111",
    fontSize: "58px",
    lineHeight: "1.1",
    fontWeight: "500",
    textAlign: "center",
  }}
>
  AI Resume Analyzer
</h1>

          <p
  style={{
    color: "#666",
    marginBottom: "30px",
    lineHeight: "1.6",
    fontSize: "16px",
    maxWidth: "350px",
  }}
>
  Login to analyze your resume and improve
  your ATS score.
</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
             style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              fontSize: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              marginBottom: "15px",
            }}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #b46262",
                marginBottom: "15px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background: "#1e61f1",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow:
      "0 8px 20px rgba(37,99,235,0.3)",
              }}
            >
              Login
            </button>
          </form>

          <div
  style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <GoogleLogin
    onSuccess={(credentialResponse) => {
      console.log(credentialResponse);
      localStorage.setItem("token", "google-login");
      localStorage.setItem("name", "Google User");
      window.location.href = "/dashboard";
    }}
    onError={() => {
      alert("Google Login Failed");
    }}
  />
</div>

          <p style={{ marginTop: "15px" }}>
            <a href="/forgot-password">
              Forgot Password?
            </a>
          </p>

          <p style={{ marginTop: "20px" }}>
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>
        </div>

        <div
          style={{
            flex: 1,
            background:
              "linear-gradient(135deg,#b46262,#7c3aed)",
            color: "white",
            padding: "50px",
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              marginBottom: "30px",
            }}
          >
            ATS Analytics
          </h1>

          <h3>
            📈 Resume Success Tracking
          </h3>

          <h3>
            📊 Skill Matching Analysis
          </h3>

          <h3>
            🎯 ATS Optimization
          </h3>

          <h3>
            💼 Job Ready Resume Insights
          </h3>

          <p
            style={{
              marginTop: "25px",
              lineHeight: "1.7",
            }}
          >
            Improve your resume, identify
            missing skills, and increase
            your chances of getting
            shortlisted by recruiters.
          </p>
        </div>
      </div>
    </div>
  );
}
  export default Login;