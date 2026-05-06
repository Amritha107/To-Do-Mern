import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://to-do-mern-abzu.onrender.com/api/auth/login",

        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 shadow mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <h1 className="text-center mb-4">
          Login
        </h1>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-3 text-center">
          Don’t have an account?{" "}

          <span
            style={{
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate("/register")
            }
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;