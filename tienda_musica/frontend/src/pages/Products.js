import { useEffect, useState } from "react";
import "./Products.css";

function Products() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/productos/")
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  return (
    <div className="products-wrapper">
      <div className="products-container">
        <h1 className="products-title">Catálogo</h1>

        <div className="products-grid">
          {productos.map(producto => (
            <div key={producto.id} className="product-card">
                <div className="image-wrapper">
                    <span className="format-badge">
                    {producto.formato}
                    </span>

                    <img
                    src={`http://localhost:8000${producto.imagen}`}
                    alt={producto.titulo}
                    />
                </div>

                <div className="product-info">
                    <h3 className="album-title">{producto.titulo}</h3>
                    <p className="album-artist">{producto.artista}</p>
                    <p className="album-price">${producto.precio}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
