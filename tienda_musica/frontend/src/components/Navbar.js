import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
