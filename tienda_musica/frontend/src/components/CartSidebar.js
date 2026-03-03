import React, { useContext } from 'react';
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

                {cart.items.length === 0 ? (
                    <p>El carrito está vacío.</p>
                ) : (
                    <>
                        {cart.items.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.producto.imagen} alt={item.producto.titulo} />
                                <div className="cart-item-info">
                                    <h4>{item.producto.titulo}</h4>
                                    <p>{item.producto.artista}</p>
                                    <p>Formato: {item.producto.formato}</p>
                                    <p>Precio: {formatPrice(item.producto.precio)}</p>


                                    {/* Acciones en fila debajo de la info */}
                                    <div className="cart-item-actions">
                                        <button onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}>-</button>
                                        <span>{item.cantidad}</span>
                                        <button onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}>+</button>
                                        <button onClick={() => removeFromCart(item.producto.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Boton del check out */}
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
