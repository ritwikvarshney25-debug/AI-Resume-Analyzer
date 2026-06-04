import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div style={{ padding: "30px" }}>
      <h1>AI Resume Analyzer</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
      <p>
  Don't have an account?{" "}
  <Link to="/register">Register</Link>
</p>
    </div>
  );
}

export default Login;