import DOMPurify from "dompurify";
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
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);

    setInputs((prev) => ({ ...prev, [name]: sanitizedValue }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = inputs;
    console.log(password);

    try {
      console.log(inputs);
      if (
        !/^[a-zA-Z0-9]*$/.test(username) &&
        !/^[a-zA-Z0-9]*$/.test(password)
      ) {
        console.log("aló");
        setError("Special characters are not allowed.");
        setTimeout(() => setError(null), 3000);

        return;
      }
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
        <input
          required
          type="text"
          placeholder="Código 2FA"
          name="token"
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
