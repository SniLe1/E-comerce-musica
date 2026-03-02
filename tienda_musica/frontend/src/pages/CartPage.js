import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import './CartPage.css';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
        }).format(price);
    };


    return (
        <div className="cart-page">
        <h2>Tu Carrito</h2>

        {cart.items.length === 0 ? (
            <p>El carrito está vacío.</p>
        ) : (
            <>
            {cart.items.map(item => (
                <div key={item.id} className="cart-item">
                <img src={item.producto.imagen} 
                    alt={item.producto.titulo} />
                <div className="cart-item-info">
                    <h4>{item.producto.titulo}</h4>
                    <p>{item.producto.artista}</p>
                    <p>Precio: {formatPrice(item.producto.precio)}</p>
                </div>
                <div className="cart-item-actions">
                    <button 
                        onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}>-</button>
                    <span>{item.cantidad}</span>
                    <button 
                        onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}>+</button>
                    <button 
                        onClick={() => removeFromCart(item.producto.id)}>Eliminar</button>
                </div>
                </div>
            ))}

            <div className="cart-total">
                Total: {formatPrice(cart.total)}
            </div>
            </>
        )}
        </div>
    );
};

export default CartPage;
