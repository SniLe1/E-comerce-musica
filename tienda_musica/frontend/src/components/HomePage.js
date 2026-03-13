import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Carousel } from "bootstrap";

function HomePage() {

  const [productos, setProductos] = useState([]);
  const [homeData, setHomeData] = useState(null);

  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // ================================
  // CARGAR PRODUCTOS
  // ================================

  useEffect(() => {

    fetch("http://localhost:8000/api/tienda/productos/")
      .then(response => response.json())
      .then(data => {

        if (Array.isArray(data)) {
          setProductos(data);
        } else if (data.results) {
          setProductos(data.results);
        }

      });

  }, []);


  // CARGAR CONFIG HOME
  useEffect(() => {

    fetch("http://localhost:8000/api/home/")
      .then(res => res.json())
      .then(data => setHomeData(data));

  }, []);


  // INICIALIZAR CARRUSEL
  useEffect(() => {

    if (!carouselRef.current) return;

    if (!homeData?.carousel?.length) return;

    const carousel = new Carousel(carouselRef.current, {
      interval: 5000,
      ride: "carousel",
      wrap: true
    });

    return () => carousel.dispose();

  }, [homeData]);


  if (!homeData) {
    return <p>Cargando...</p>;
  }


  return (
    <div className="home-wrapper">
      {/* HERO */}
      <div className="hero-section">
        {/* CARRUSEL */}
        <div
          ref={carouselRef}
          className="carousel slide hero-carousel"
        >
          <div className="carousel-inner">
            {homeData.carousel.map((img, i) => (
              <div
                key={img.id}
                className={`carousel-item ${i === 0 ? "active" : ""}`}
              >
                <img
                  src={img.image_url}
                  className="d-block w-100"
                  alt="carousel"
                />
              </div>
            ))}
          </div>
        </div>

        {/* TEXTO ENCIMA */}
        <div className="hero-overlay text-center">
          <h1 className="mb-4">{homeData.hero?.title}</h1>
          <p className="lead mb-4">
            {homeData.hero?.description}
          </p>
          <button
            className="btn vintage-btn btn-lg"
            onClick={() => navigate("/products")}
          >
            Ver catálogo
          </button>

          <hr className="my-5 text-light"/>
          <div className="row hero-features">
            {homeData.features?.map((f, i) => (
              <div key={i} className="col-md-4">
                <h5>{f.icon} {f.title}</h5>
                <p className="product-muted">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* PRODUCTOS RECIENTES */}
      <div className="container pb-5 mt-5">
        <h2 className="mb-4 text-center product-muted">
          Los últimos discos que llegaron al estante.
        </h2>
        <div className="row g-4">
          {productos
            .sort((a, b) => b.id - a.id)
            .slice(0, 3)
            .map(prod => (
              <div key={prod.id} className="col-12 col-sm-6 col-lg-4 d-flex">
                <div className="product-card w-100">
                  <div className="new-badge">NEW</div>
                  <img
                    src={prod.imagen}
                    className="card-img-top"
                    alt={prod.titulo}
                  />
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