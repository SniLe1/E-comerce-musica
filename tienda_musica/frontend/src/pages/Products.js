import { use, useEffect, useState } from "react";
import "./Products.css";

function Products() {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [formato, setFormato] = useState("");

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const fetchProductos = () => {
    let url = "http://localhost:8000/api/productos/?";

    if (formato) {
      url += `formato=${formato}&`;
    }

    if (search) {
      url += `search=${search}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("DATA:", data);

        if (Array.isArray(data)) {
          setProductos(data);
        } else if (data.results) {
          setProductos(data.results);
        } else {
          setProductos([]);
        }
      })
      .catch(error => {
        console.error("Error fetching:", error);
        setProductos([]);
      });
  };


  useEffect (() => {
    fetchProductos();
  }, [search, formato]);

  return (
    <div className="products-wrapper">
      <div className="products-layout">

        {/* SIDEBAR */}
        <div className="filters-sidebar">
          <h2>Filtros</h2>

          <input
            type="text"
            placeholder="Buscar por álbum o artista..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <div className="format-tags">
            <button
              className={`tag ${formato === "" ? "active" : ""}`}
              onClick={() => setFormato("")}
            >
              Todos
            </button>

            <button
              className={`tag ${formato === "vinilo" ? "active" : ""}`}
              onClick={() => setFormato("vinilo")}
            >
              Vinilo
            </button>

            <button
              className={`tag ${formato === "cd" ? "active" : ""}`}
              onClick={() => setFormato("cd")}
            >
              CD
            </button>

            <button
              className={`tag ${formato === "digital" ? "active" : ""}`}
              onClick={() => setFormato("digital")}
            >
              Digital
            </button>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="products-content">
          <h1 className="products-title">Catálogo</h1>

          <div className="products-grid">
            {Array.isArray(productos) && productos.map(producto => (
              <div key={producto.id} className="product-card">
                <div className="image-wrapper">
                    <span className="format-badge">
                      {producto.formato}
                    </span>
                    <img
                      src={producto.imagen}
                      alt={producto.titulo}
                    />
                </div>
                  <div className="product-info">
                    <h3 className="album-title">{producto.titulo}</h3>
                    <p className="album-artist">{producto.artista}</p>
                    <p className="price">{formatPrice(producto.precio)}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>

  );
}

export default Products;
