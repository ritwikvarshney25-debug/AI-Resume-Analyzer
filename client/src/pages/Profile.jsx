import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedEmail = localStorage.getItem("email");

    setUser({
      name: savedName || "User",
      email: savedEmail || "No Email",
    });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>👤 User Profile</h1>

      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          maxWidth: "400px",
        }}
      >
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}

export default Profile;