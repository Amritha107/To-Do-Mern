import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://to-do-mern-abzu.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registered Successfully");

      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Registration Failed");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 shadow mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <h1 className="text-center mb-4">
          Register
        </h1>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          className="btn btn-success"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="mt-3 text-center">
          Already have an account?{" "}

          <span
            style={{
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;