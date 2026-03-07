import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Carousel } from "bootstrap";

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [config, setConfig] = useState({
    carousel_images: [],
    title: "",
    description: "",
    features: []
  });

  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Obtener productos
  useEffect(() => {
    fetch("http://localhost:8000/api/tienda/productos/")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else if (data.results) {
          setProductos(data.results);
        } else {
          setProductos([]);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Obtener configuración del Home
  useEffect(() => {
    fetch("http://localhost:8000/api/home/admin/home/")
      .then((response) => response.json())
      .then((data) => setConfig(data))
      .catch((error) => console.error("Error al cargar configuración del Home:", error));
  }, []);

  // Inicializar carrusel
  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = new Carousel(carouselRef.current, {
      interval: false,
      wrap: true,
    });

    const intervalId = setInterval(() => {
      carousel.next();
    }, 5000);

    return () => {
      clearInterval(intervalId);
      carousel.dispose();
    };
  }, [config]); // 👈 se reinicia cuando cambia la config

  if (!config) {
    return <p>Cargando Home...</p>;
  }

  return (
    <div className="home-wrapper">
      {/* HERO CON CARRUSEL */}
      <div className="hero-section">
        {/* Carrusel */}
        <div ref={carouselRef} className="carousel slide hero-carousel">
          <div className="carousel-inner">
            {config.carousel_images.map((img, i) => (
              <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                <img src={img} className="d-block w-100" alt={`Imagen ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* TEXTO ENCIMA */}
        <div className="hero-overlay text-center">
          <h1 className="mb-4">{config.title}</h1>
          <p className="lead mb-4">{config.description}</p>
          <button className="btn vintage-btn btn-lg">Ver catálogo</button>
          <hr className="my-5 text-light" />

          <div className="row hero-features">
            {config.features.map((f, i) => (
              <div key={i} className="col-md-4">
                <h5>{f.icon} {f.title}</h5>
                <p className="product-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTOS RECIÉN LLEGADOS */}
      <div className="container pb-5 mt-5">
        <h2 className="mb-4 text-center product-muted">
          Los últimos discos que llegaron al estante.
        </h2>

        <div className="row g-4">
          {productos
            .sort((a, b) => b.id - a.id)
            .slice(0, 3)
            .map((prod) => (
              <div key={prod.id} className="col-12 col-sm-6 col-lg-4 d-flex">
                <div className="product-card w-100">
                  <div className="new-badge">NEW</div>

                  <img src={prod.imagen} className="card-img-top" alt={prod.titulo} />

                  <div className="card-body">
                    <h5>{prod.titulo}</h5>
                    <p>{prod.artista}</p>
                    <p><strong>Formato:</strong> {prod.formato_display}</p>
                    <p><strong>Precio:</strong> {formatPrice(prod.precio)}</p>
                  </div>

                  <button
                    className="btn-vintage"
                    onClick={() => navigate(`/products/${prod.slug}`)}
                  >
                    Ver detalle
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
