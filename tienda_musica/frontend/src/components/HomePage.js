import React from "react";

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          
          <h1 className="mb-4">Tienda de Música</h1>

          <p className="lead text-muted mb-4">
            Compra música en formato físico y digital.
            Vinilos, CDs y descargas en alta calidad.
          </p>

          <button className="btn btn-dark btn-lg">
            Ver catálogo
          </button>

          <hr className="my-5" />

          <div className="row">
            <div className="col-md-4">
              <h5>🎧 Digital</h5>
              <p className="text-muted">
                Descarga inmediata en MP3 y FLAC.
              </p>
            </div>

            <div className="col-md-4">
              <h5>💿 Físico</h5>
              <p className="text-muted">
                Vinilos y CDs con envío a todo el país.
              </p>
            </div>

            <div className="col-md-4">
              <h5>⭐ Calidad</h5>
              <p className="text-muted">
                Música original y sin compresión.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
