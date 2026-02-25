import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProductDetail.css";

function ProductDetail() {
    const { slug } = useParams();
    const [producto, setProducto] = useState(null);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        }).format(price);
    };

    useEffect(() => {
        fetch(`http://localhost:8000/api/productos/${slug}/`)
        .then(res => res.json())
        .then(data => setProducto(data))
        .catch(err => console.error(err));
    }, [slug]);

    if (!producto) return <p className="text-center mt-5">Cargando producto...</p>;

    return (
        <div className="product-detail-container">
            <div className="product-detail-card">

                <div className="product-detail-image-wrapper">
                <img
                className="product-detail-image"
                src={producto.imagen}
                alt={producto.titulo}
                />
                </div>

                <div className="product-detail-info">
                <h2 className="product-detail-title">{producto.titulo}</h2>
                <h4 className="product-detail-artist">{producto.artista}</h4>

                <p className="product-detail-format">
                    <strong>Formato:</strong> {producto.formato_display}
                </p>

                <p className="product-detail-price">
                    {formatPrice(producto.precio)}
                </p>

                <p className="product-detail-description">
                    {producto.descripcion}
                </p>

                <div className="product-detail-button-group">
                    <button className="product-detail-buy-btn">
                    Comprar ahora
                    </button>

                    <button className="product-detail-cart-btn">
                    Añadir al carrito
                    </button>
                </div>
            </div>

        </div>
    </div>
    );
}

export default ProductDetail;