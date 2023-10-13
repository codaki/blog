import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Edit from "../img/logo3.png";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
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
          <h1>Inicio Sesion</h1>
        </center>
        <center>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
            alt="usuario"
            width="100px"
            border="0"
          />
        </center>
        <input
          required
          type="text"
          placeholder="usuario"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Iniciar Sesion</button>
        {err && <p>{err}</p>}
        <span>
          No tienes una cuenta? <Link to="/register">Registrate</Link>
        </span>
      </form>
          
    </div>
  );
};
export default Login;
