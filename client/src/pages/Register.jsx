import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Edit from "../img/logo3.png";
const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="auth">
      <Link to="/">
        <img src={Edit} alt="logo" width="350px" border="0" />
      </Link>
      <form>
        <center>
          <h1>Registrarse</h1>
        </center>
        <center>
          <img
            src="https://cdn-icons-png.flaticon.com/512/40/40358.png"
            alt="usuario"
            width="100px"
            border="0"
          />
        </center>
        <input
          required
          type="text"
          placeholder="Usuario"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="correo"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="contraseña"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}> Registrate</button>
        {err && <p>{err}</p>}
        <span>
          Tienes una cuenta? <Link to="/login">Inicio Sesion</Link>
        </span>
      </form>
         
    </div>
  );
};
export default Register;
