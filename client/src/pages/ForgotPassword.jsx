import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {
    try {
      const res = await axios.post(
        "https://ai-resume-analyzer-c1px.onrender.com/api/auth/forgot-password",
        {
          email,
          newPassword,
        }
      );

      alert(res.data.message);

    } catch (error) {
  console.log(error);
  console.log(error.response?.data);
  alert(error.response?.data?.message || "Password Reset Failed");
}
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleReset}>
        Reset Password
      </button>
    </div>
  );
}

export default ForgotPassword;