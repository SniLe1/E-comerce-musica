import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState({ items: [], total: 0 });

  // Obtener carrito al cargar
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
        const res = await axios.get('/api/cart/carrito/');
        setCart(res.data);
        } catch (error) {
        console.error('Error al obtener carrito:', error);
        }
    };

    const addToCart = async (productoId, cantidad = 1) => {
        try {
        const res = await axios.post('/api/cart/carrito/add/', {
            producto_id: productoId,
            cantidad,
        });
        setCart(res.data);
        } catch (error) {
        console.error('Error al agregar producto:', error);
        }
    };

    const removeFromCart = async (productoId) => {
        try {
        const res = await axios.post('/api/cart/carrito/remove/', {
            producto_id: productoId,
        });
        setCart(res.data);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    const updateQuantity = async (productoId, cantidad) => {
        try {
        const res = await axios.post('/api/cart/carrito/update_quantity/', {
            producto_id: productoId,
            cantidad,
        });
        setCart(res.data);
        } catch (error) {
            console.error('Error al actualizar cantidad:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
        {children}
        </CartContext.Provider>
    );
};
