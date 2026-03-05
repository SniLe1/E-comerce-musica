import { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import CartSidebar from "./CartSidebar";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useContext(CartContext);
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
    <>
      <nav className="navbar-vintage">
        <div className="nav-container">
          
          {/* Bloque izquierda */}
          <div className="nav-left">
            {/* Hamburguesa (solo móvil) */}
            <div 
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}>☰
            </div>
            {/* Links izquierda (solo desktop) */}
            <ul className="nav-links-left">
              <li><Link to="/products">Catálogo</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* Bloque centro */}
          <div className="nav-center">
            <div className="nav-logo">
              <Link to="/">Vinyl Store</Link>
            </div>
          </div>

          {/* Bloque derecha */}
          <div className="nav-right">
            <ul className="nav-links-right">
              {/* Registro solo si NO hay usuario */}
              {!username && ( 
                <li><Link to="/register">Registro</Link></li>
              )}
              {/* Login o saludo según estado */}
              {!username ? (
                <li><Link to="/login">Iniciar sesión</Link></li>
              ) : (
                <li className="nav-user-group">
                  <span className="nav-user">¡Hola, {username}! 👋</span>
                  <button className="nav-logout" onClick={handleLogout}>Cerrar sesión</button>
                </li>
              )}
            </ul>
            {/* Carrito */}
            <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
              🛒 <span className="cart-count">{cart.items?.length || 0}</span>
            </div>
          </div>

        </div>

        {/* Overlay para cerrar al pinchar afuera */}
        {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}

        {/* Menú lateral (solo móvil) */}
        <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
          <ul>
            <li><Link to="/products" onClick={() => setMenuOpen(false)}>Catálogo</Link></li>
            <li><Link to="/nosotros" onClick={() => setMenuOpen(false)}>Nosotros</Link></li>
            <li><Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link></li>
            {!username && (
              <li><Link to="/register" onClick={() => setMenuOpen(false)}>Registro</Link></li>
            )}
            {!username ? (
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link></li>
            ) : (
              <li className="nav-user-group">
                <span className="nav-user">¡Hola, {username}! 👋</span>
                <button className="nav-logout" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Sidebar del carrito */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;
