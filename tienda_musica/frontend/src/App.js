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
import { CartProvider } from "./components/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000)
  };


  return (
    <CartProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/activate/:uid/:token" element={<Activate />} />
              <Route path="/products" element={<Products />} />
              <Route 
                  path="/products/:slug" 
                  element={<ProductDetail onOpenCart={() => setIsCartOpen(true)}
                  onShowToast={showToast}
                />} 
              />
              {/* 👈 pasamos la función para abrir el carrito */}
            </Routes>
          </main>
          <Footer />
          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />

          {/* 👇 aquí va el toast */}
          <Toast message="Producto añadido al carrito" show={toastVisible} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;