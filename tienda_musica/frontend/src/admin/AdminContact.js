import React, { useEffect, useState } from "react";
import "./AdminContact.css";

function AdminContact() {

    const [mensajes, setMensajes] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const [notification, setNotification] = useState(null);

    // =============================
    // NOTIFICACIONES
    // =============================
    const showNotification = (message, type = "success") => {
        setNotification({ message, type, visible: true });

        setTimeout(() => {
            setNotification((prev) => ({ ...prev, visible: false }));
        }, 2500);

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    // =============================
    // CARGAR MENSAJES
    // =============================
    useEffect(() => {
        fetch("http://localhost:8000/api/contacto/")
            .then(res => res.json())
            .then(data => setMensajes(data))
            .catch(() => showNotification("Error cargando mensajes", "error"));
    }, []);

    // =============================
    // MARCAR COMO LEÍDO
    // =============================
    const marcarLeido = async (id) => {
        const res = await fetch(`http://localhost:8000/api/contacto/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ leido: true })
        });

        if (res.ok) {
            setMensajes(mensajes.map(m => 
                m.id === id ? { ...m, leido: true } : m
            ));
            showNotification("Marcado como leído");
        } else {
            showNotification("Error al actualizar", "error");
        }
    };

    // =============================
    // MARCAR COMO RESPONDIDO
    // =============================
    const marcarRespondido = async (id) => {
        const res = await fetch(`http://localhost:8000/api/contacto/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ respondido: true })
        });

        if (res.ok) {
            setMensajes(mensajes.map(m => 
                m.id === id ? { ...m, respondido: true } : m
            ));
            showNotification("Marcado como respondido");
        } else {
            showNotification("Error al actualizar", "error");
        }
    };

    return (
        <>
            {/* TOAST */}
            {notification && (
                <div className={`custom-toast ${notification.type} ${notification.visible ? "show" : "hide"}`}>
                    {notification.message}
                </div>
            )}

            <div className="admin-products-container">

                {/* SIDEBAR */}
                <aside className="admin-products-sidebar">
                    <h2>Panel Admin</h2>
                    <ul>
                        <li><a href="/admin/home">Modificar Home</a></li>
                        <li><a href="/admin/products">Productos</a></li>
                        <li><a href="/admin/contact">Mensajes</a></li>
                    </ul>

                    <div className="admin-products-back">
                        <a href="/">⬅ Volver</a>
                    </div>
                </aside>

                {/* MAIN */}
                <main className="admin-products-main">

                    <h1>Mensajes de Contacto</h1>

                    <div className="products-grid-admin">

                        {Array.isArray(mensajes) && mensajes.map(m => (
                            <div 
                                key={m.id} 
                                className={`product-card-admin ${!m.leido ? "unread" : ""}`}
                                onClick={() => setSelectedMessage(m)}
                            >
                                <h4>{m.nombre}</h4>
                                <p>{m.email}</p>

                                <div className="message-badges">
                                    {!m.leido && <span className="badge new">Nuevo</span>}
                                    {m.respondido && <span className="badge done">Respondido</span>}
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* MODAL */}
                    {selectedMessage && (
                        <div className="pico-overlay" onClick={() => setSelectedMessage(null)}>

                            <div className="pico" onClick={(e) => e.stopPropagation()}>

                                <h3>{selectedMessage.nombre}</h3>

                                <p><strong>Email:</strong> {selectedMessage.email}</p>
                                <p><strong>Mensaje:</strong></p>

                                <div className="message-content">
                                    {selectedMessage.mensaje}
                                </div>

                                <div className="modal-actions">
                                    {!selectedMessage.leido && (
                                        <button onClick={() => marcarLeido(selectedMessage.id)}>
                                            Marcar como leído
                                        </button>
                                    )}

                                    {!selectedMessage.respondido && (
                                        <button onClick={() => marcarRespondido(selectedMessage.id)}>
                                            Marcar como respondido
                                        </button>
                                    )}

                                    <button onClick={() => setSelectedMessage(null)}>
                                        Cerrar
                                    </button>
                                </div>

                            </div>

                        </div>
                    )}

                </main>
            </div>
        </>
    );
}

export default AdminContact;