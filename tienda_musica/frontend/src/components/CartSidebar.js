import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const [items, setItems] = useState(cart.items);

    // 🔄 Mantener sincronizado el estado local con el contexto
    useEffect(() => {
        setItems(cart.items);
    }, [cart.items]);

    const handleRemove = (id) => {
        // 🆕 Cambio: en vez de "removing: true", ahora guardamos un string con el nombre de la animación
        setItems(prev =>
            prev.map(item =>
                item.producto.id === id ? { ...item, removing: "slide-out" } : item
            )
        );

        // ⏱ Espera la duración de la animación antes de eliminarlo del contexto
        setTimeout(() => {
            removeFromCart(id); // actualiza el contexto global
            setItems(prev => prev.filter(item => item.producto.id !== id));
        }, 400); // mismo tiempo que la animación en CSS
    };

    return (
        <>
            {/* Overlay oscuro */}
            <div 
                className={`cart-overlay ${isOpen ? 'open' : ''}`} 
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Carrito</h2>
                    <button onClick={onClose}>✖</button>
                </div>

                {items.length === 0 ? (
                    <p>El carrito está vacío.</p>
                ) : (
                    <>
                        {items.map(item => (
                            <div 
                                key={item.producto.id} 
                                // 🆕 Cambio: usamos item.removing como clase dinámica (puede ser "slide-out" o "removing")
                                className={`cart-item animate-in ${item.removing ? item.removing : ""}`}
                            >
                                <img src={item.producto.imagen} alt={item.producto.titulo} />
                                <div className="cart-item-info">
                                    <h4>{item.producto.titulo}</h4>
                                    <p>{item.producto.artista}</p>
                                    <p>Formato: {item.producto.formato}</p>
                                    <p>Precio: {formatPrice(item.producto.precio)}</p>

                                    {/* Acciones */}
                                    <div className="cart-item-actions">
                                        <button onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}>-</button>
                                        <span>{item.cantidad}</span>
                                        <button onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}>+</button>
                                        {/* 🆕 Cambio: ahora usamos handleRemove en vez de removeFromCart directo */}
                                        <button onClick={() => handleRemove(item.producto.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Botón de checkout */}
                        <div className="checkout-section">
                            <button className='checkout-button'>
                                Check Out • {formatPrice(cart.total)} CLP
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartSidebar;
