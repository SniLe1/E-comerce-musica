import React, { useState } from "react";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Activate from "./pages/Activate";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import CartSidebar from "./components/CartSidebar";
import Toast from "./components/Toast";
import AdminPage from "./pages/AdminPage";
import AdminHome from "./pages/AdminHome";
import { CartProvider } from "./components/CartContext";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Wrapper para usar useLocation dentro del Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

// 👇 Aquí defines el wrapper de ruta privada
function PrivateAdminRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <HomePage />;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const location = useLocation(); // ✅ ahora sí funciona

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <CartProvider>
      <div className="app-wrapper">
        {/* Mostrar Navbar solo si NO estamos en /admin */}
        {location.pathname.startsWith("/admin") ? null : <Navbar />}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activate/:uid/:token" element={<Activate />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/admin"
              element={
                <PrivateAdminRoute>
                  <AdminPage />
                </PrivateAdminRoute>
              }
            />
            
            <Route
              path="/admin/home"
              element={
                <PrivateAdminRoute>
                  <AdminHome />
                </PrivateAdminRoute>
              }
            />

            <Route
              path="/products/:slug"
              element={
                <ProductDetail
                  onOpenCart={() => setIsCartOpen(true)}
                  onShowToast={showToast}
                />
              }
            />
          </Routes>
        </main>

        {/* Footer solo si no es admin */}
        {location.pathname.startsWith("/admin") ? null : <Footer />}

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />

        <Toast message="Producto añadido al carrito" show={toastVisible} />
      </div>
    </CartProvider>
  );
}

export default AppWrapper;
