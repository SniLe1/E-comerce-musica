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
          <li>Inicio</li>
          <li>Catálogo</li>
          <li>Nosotros</li>
          <li>Contacto</li>
          <li><Link to="/register">Registro</Link></li>


        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
