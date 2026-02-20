import React from "react";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Activate from "./pages/Activate";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
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
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;