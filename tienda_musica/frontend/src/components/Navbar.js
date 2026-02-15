import { useState , useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUsername(null);
    navigate("/");
  };


  return (
    <nav className="navbar-vintage">
      <div className="nav-container">
        <div className="nav-logo">Vinyl Store</div>

        <div 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/">Catálogo</Link></li>
          <li><Link to="/">Nosotros</Link></li>
          <li><Link to="/">Contacto</Link></li>
          <li><Link to="/register">Registro</Link></li>
          {!username ? (
              <li >
                <Link to="/login">
                  Iniciar sesión
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-user-group">
                  <span className="nav-user">
                    ¡Hola, {username}! 👋
                  </span>

                  <button className="nav-logout" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}          
   
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
