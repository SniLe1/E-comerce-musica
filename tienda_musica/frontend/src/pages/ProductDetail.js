import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import "./ProductDetail.css";
import Toast from "../components/Toast";
import { CartContext } from "../components/CartContext";


function ProductDetail( {onOpenCart, onShowToast} ) {
    const { slug } = useParams();
    const [producto, setProducto] = useState(null);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        if (producto) {
            await addToCart(producto.id, 1) // Agrega el producto al carrito con cantidad 1
            onOpenCart();
            onShowToast();
        }
    };

    const handleBuyNow = () => {
        if (producto) {
            addToCart(producto.id, 1); // Agrega el producto al carrito con cantidad 1
            navigate("/cart"); // Redirige al carrito
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        }).format(price);
    };

    useEffect(() => {
        fetch(`http://localhost:8000/api/tienda/productos/${slug}/`)
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
                    <button 
                    className="product-detail-buy-btn"
                    onClick={handleBuyNow}>
                    Comprar ahora
                    </button>

                    <button 
                    className="product-detail-cart-btn"
                    onClick={handleAddToCart}>
                    Añadir al carrito
                    </button>
                </div>
            </div>

        </div>
    </div>
    );
}

export default ProductDetail;