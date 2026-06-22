import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [newPassword, setNewPassword] = useState("");

const sendOtp = async () => {
try {
const res = await axios.post(
"http://localhost:5000/api/auth/forgot-password",
{ email }
);

  alert(res.data.message);
} catch (error) {
  alert(
    error.response?.data?.message ||
    "Failed to send OTP"
  );
}

};

const resetPassword = async () => {
try {
const res = await axios.post(
"http://localhost:5000/api/auth/reset-password",
{
email,
otp,
newPassword,
}
);

  alert(res.data.message);
  navigate("/");
} catch (error) {
  alert(
    error.response?.data?.message ||
    "Password Reset Failed"
  );
}

};

return (
<div style={{ padding: "30px" }}> <h1>Forgot Password</h1>

```
  <input
    type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <br />
  <br />

  <button onClick={sendOtp}>
    Send OTP
  </button>

  <br />
  <br />

  <input
    type="text"
    placeholder="Enter OTP"
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
  />

  <br />
  <br />

  <input
    type="password"
    placeholder="Enter New Password"
    value={newPassword}
    onChange={(e) =>
      setNewPassword(e.target.value)
    }
  />

  <br />
  <br />

  <button onClick={resetPassword}>
    Reset Password
  </button>
</div>

);
}

export default ForgotPassword;
