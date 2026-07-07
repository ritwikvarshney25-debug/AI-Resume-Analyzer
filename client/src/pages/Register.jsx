import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
  let newErrors = {};

  if (!name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    newErrors.email = "Invalid email address";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password =
      "Password must be at least 6 characters";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
  
  const handleRegister = async (e) => {
    e.preventDefault();

     if (!validateForm()) return;

    if (!name || !email || !password) {
  alert("Please fill all fields");
  return;
}

setLoading(true);

    try {
      const res = await axios.post(
  "https://ai-resume-analyzer-backend-xefi.onrender.com/api/auth/register",
  {
    name,
    email,
    password,
  }
);

      alert(res.data.message);

      window.location.href = "/";

    } catch (error) {
      setLoading(false);

      alert(
        error.response?.data?.message || "Registration Failed"
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
        "linear-gradient(135deg,#2563eb,#7c3aed)",
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
        boxShadow:
          "0 15px 40px rgba(0,0,0,0.25)",
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
    fontSize: "56px",
    lineHeight: "1.1",
    fontWeight: "500",
    textAlign: "center",
  }}
>
  Create Account
</h1>

<p
  style={{
    color: "#666",
    marginBottom: "30px",
    lineHeight: "1.6",
    fontSize: "16px",
    textAlign: "center",
  }}
>
  Register to analyze your resume and
  improve your ATS score.
</p>

      <form onSubmit={handleRegister}>
        <input
  type="text"
  placeholder="Enter Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "15px",
    boxSizing: "border-box",
  }}
/>

{errors.name && (
  <p
    style={{
      color: "red",
      fontSize: "13px",
      marginTop: "-8px",
      marginBottom: "10px",
    }}
  >
    {errors.name}
  </p>
)}

       <input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "15px",
    boxSizing: "border-box",
  }}
/>

{errors.email && (
  <p
    style={{
      color: "red",
      fontSize: "13px",
      marginTop: "-8px",
      marginBottom: "10px",
    }}
  >
    {errors.email}
  </p>
)}

  <div
  style={{
    position: "relative",
    marginBottom: "15px",
  }}
>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{
      width: "100%",
      padding: "14px",
      paddingRight: "50px",
      borderRadius: "10px",
      border: "1px solid #e5e7eb",
      fontSize: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      boxSizing: "border-box",
    }}
  />

  <span
    onClick={() =>
      setShowPassword(!showPassword)
    }
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      userSelect: "none",
      fontSize: "18px",
    }}
  >
    {showPassword ? "🙈" : "👁️‍🗨️"}

    {errors.password && (
  <p
    style={{
      color: "red",
      fontSize: "13px",
      marginTop: "-8px",
      marginBottom: "10px",
    }}
  >
    {errors.password}
  </p>
)}

  </span>
</div>

        <br /><br />

       <button
  type="submit"
  disabled={loading}
  style={{
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.7 : 1,
    boxShadow: "0 8px 20px rgba(37,99,235,0.3)",
  }}
>
  {loading ? "Creating Account..." : "Create Account"}
</button>
      </form>

      <div
  style={{
    display: "flex",
    alignItems: "center",
    margin: "25px 0",
  }}
>
  <hr style={{ flex: 1 }} />

  <span
    style={{
      margin: "0 15px",
      color: "#666",
      fontSize: "14px",
    }}
  >
    OR
  </span>

  <hr style={{ flex: 1 }} />
</div>

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
      
      alert(res.data.message);
      setLoading(false);

      localStorage.setItem(
        "token",
        "google-login"
      );
      localStorage.setItem(
        "name",
        "Google User"
      );

      window.location.href = "/dashboard";
    }}
    onError={() => {
      alert("Google Login Failed");
    }}
  />
</div>

      <p
  style={{
    marginTop: "25px",
    textAlign: "center",
    color: "#666",
    fontSize: "15px",
  }}
>
  Already have an account?{" "}
  <Link
  to="/"
  style={{
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none",
  }}
>
  Login
</Link>
</p>

</div>   {/* Left Side End */}

<div
  style={{
    flex: 1,
    background:
      "linear-gradient(135deg,#b46262,#7c3aed)",
    color: "white",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}
>
  <h1
  style={{
    fontSize: "46px",
    marginBottom: "25px",
  }}
>
  Welcome!
</h1>

  <h3>🤖 AI Resume Analysis</h3>
  <h3>📈 ATS Score Checker</h3>
  <h3>📄 Resume History</h3>
  <h3>🎯 Skill Gap Analysis</h3>

  <p
  style={{
    marginTop: "25px",
    lineHeight: "1.8",
    fontSize: "17px",
    opacity: "0.95",
  }}
>
  Create your account to unlock AI-powered
  resume analysis, ATS score tracking,
  resume history, and personalized
  career insights.
</p>
</div>

</div> {/* Main Card End */}

</div> 

  );
}

export default Register;