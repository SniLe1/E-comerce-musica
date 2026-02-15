import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import "./HomePage.css";

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/productos/")
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error("Error:", error));
  }, []);


  return (
    <div className="home-wrapper">
      {/* HERO - igual al concepto inicial */}
      <div className="container py-5">

          <div className="text-center p-5 rounded hero-box">

          <h1 className="mb-4">Tienda de Música</h1>

          <p className="lead product-muted mb-4">
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

      {/* PRODUCTOS DESTACADOS (solo algunos) */}
      <div className="container pb-5">
        <h2 className="mb-4 text-center">Productos destacados</h2>

      <div className="row g-4">
        {productos.map(prod => (
          <div key={prod.id} className="col-12 col-sm-6 col-lg-4 d-flex">
            <div className="product-card w-100">
            <img 
              src={`http://127.0.0.1:8000${prod.imagen}`} 
              className="card-img-top"
              alt={prod.titulo}
            />
              <div className="card-body">
                <h5>{prod.titulo}</h5>
                <p>{prod.artista}</p>
                <p><strong>Formato:</strong> {prod.formato}</p>
                <p><strong>Precio:</strong> ${prod.precio}</p>
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
