import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Carousel from "bootstrap/js/dist/carousel";


function HomePage() {
  const [productos, setProductos] = useState([]);
  /*const [username, setUsername] = useState(null);*/

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/productos/")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else if (data.results) {
          setProductos(data.results);
        } else {
          setProductos([]);
        }
      })

      .catch(error => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const carouselElement = document.querySelector('#heroCarousel');
    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 5000,
        ride: 'carousel'
      });
    }
  }, []);



return (
  <div className="home-wrapper">

    {/* HERO CON CARRUSEL */}
    <div className="hero-section">

      {/* Carrusel */}
      <div
        id="heroCarousel"
        className="carousel carousel-fade slide hero-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="/images/vinilo1.jpg"
              className="d-block w-100"
              alt="Vinilo"
            />
          </div>

          <div className="carousel-item">
            <img
              src="/images/vinilo2.jpg"
              className="d-block w-100"
              alt="Discos"
            />
          </div>

          <div className="carousel-item">
            <img
              src="/images/vinilo3.jpg"
              className="d-block w-100"
              alt="Tienda"
            />
          </div>

        </div>
      </div>

      {/* TEXTO ENCIMA */}
      <div className="hero-overlay text-center">
        <h1 className="mb-4">Tienda de Música</h1>

        <p className="lead mb-4">
          Compra música en formato físico y digital.<br/>
          Vinilos, CDs y descargas en alta calidad.
        </p>

        <button className="btn vintage-btn btn-lg">
          Ver catálogo
        </button>

        <hr className="my-5 text-light"/>

        <div className="row">
          <div className="col-md-4">
            <h5>🎧 Digital</h5>
            <p className="product-muted">
              Descarga inmediata en MP3 y FLAC.
            </p>
          </div>

          <div className="col-md-4">
            <h5>💿 Físico</h5>
            <p className="product-muted">
              Vinilos y CDs con envío a todo el país.
            </p>
          </div>

          <div className="col-md-4">
            <h5>⭐ Calidad</h5>
            <p className="product-muted">
              Música original y sin compresión.
            </p>
          </div>
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

                <button className="btn-vintage">
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
