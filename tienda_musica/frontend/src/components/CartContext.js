import React, { createContext, useState, useEffect } from 'react';
import api from '../axiosConfig'; // Asegúrate de que esta ruta sea correcta

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState({ items: [], total: 0 });

  // Obtener carrito al cargar
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await api.get('/api/cart/carrito/');
            setCart(res.data);
        } catch (error) {
            console.error('Error al obtener carrito:', error);
        }
    };


    const addToCart = async (productoId, cantidad = 1) => {
        try {
            const res = await api.post('/api/cart/carrito/add/', {
            producto_id: productoId,
            cantidad,
        });
        setCart(res.data);
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
        }
    };


    const removeFromCart = async (productoId) => {
        try {
            const res = await api.post('/api/cart/carrito/remove/', {
            producto_id: productoId,
        });
        setCart(res.data);
        } catch (error) {
            console.error('Error al eliminar del carrito:', error);
        }
    };   

    const updateQuantity = async (productoId, cantidad) => {
        try {
            const res = await api.post('/api/cart/carrito/update_quantity/', {
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
