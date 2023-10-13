import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo3.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=arte">
            <h6>ARTE</h6>
          </Link>
          <Link className="link" to="/?cat=fisica">
            <h6>FISICA</h6>
          </Link>
          <Link className="link" to="/?cat=computacion">
            <h6>COMPUTACION</h6>
          </Link>
          <Link className="link" to="/?cat=quimica">
            <h6>QUIMICA</h6>
          </Link>
          <Link className="link" to="/?cat=calculo">
            <h6>CALCULO</h6>
          </Link>
          <Link className="link" to="/?cat=matematicas">
            <h6>MATEMATICAS</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Cerrar Sesion</span>
          ) : (
            <Link className="link" to="/login">
              Inicio Sesion
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Escribe
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
