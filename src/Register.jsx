import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault(); // ✅ prevents page refresh

    if (!form.username || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/register", {
        username: form.username,
        password: form.password
      });

      alert(res.data.message || "Registration Successful");

      // clear form
      setForm({
        username: "",
        password: ""
      });

      // redirect
      window.location.href = "/";
      
    } catch (err) {
      console.log("Register Error:", err);

      alert(
        err.response?.data?.message ||
        "Server not responding. Check backend or port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>

      <form onSubmit={register}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}