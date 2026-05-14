import React, { useEffect, useState, useMemo } from "react";
import "./AdminContact.css";

function AdminContact() {

    const [mensajes, setMensajes] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [sendingReply, setSendingReply] = useState(false);
    const [notification, setNotification] = useState(null);
    const [sortOrder, setSortOrder] = useState("newest");
    const [filterDate, setFilterDate] = useState("");

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
    // FILTROS Y ORDEN
    // =============================
    const mensajesFiltrados = useMemo(() => {
        let resultado = [...mensajes];

        if (filterDate) {
            resultado = resultado.filter(m => {
                if (!m.creado_en) return true;
                const fechaMsg = m.creado_en.split("T")[0];
                return fechaMsg === filterDate;
            });
        }

        resultado.sort((a, b) => {
            const da = new Date(a.creado_en || 0);
            const db = new Date(b.creado_en || 0);
            return sortOrder === "newest" ? db - da : da - db;
        });

        return resultado;
    }, [mensajes, sortOrder, filterDate]);

    // =============================
    // RESPONDER MENSAJE
    // =============================
    const responderMensaje = async (id) => {
        if (!replyText.trim()) {
            showNotification("Escribe un mensaje antes de enviar", "error");
            return;
        }

        setSendingReply(true);

        const res = await fetch(`http://localhost:8000/api/contacto/responder/${id}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ respuesta: replyText })
        });

        if (res.ok) {
            setMensajes(mensajes.map(m =>
                m.id === id ? { ...m, respondido: true } : m
            ));
            showNotification("Respuesta enviada correctamente");
            setReplyText("");
            setSelectedMessage(null);
        } else {
            showNotification("Error al enviar la respuesta", "error");
        }

        setSendingReply(false);
    };

    // =============================
    // ELIMINAR MENSAJE
    // =============================
    const eliminarMensaje = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este mensaje?")) return;

        const res = await fetch(`http://localhost:8000/api/contacto/${id}/`, {
            method: "DELETE",
        });

        if (res.ok) {
            setMensajes(mensajes.filter(m => m.id !== id));
            setSelectedMessage(null);
            showNotification("Mensaje eliminado");
        } else {
            showNotification("Error al eliminar", "error");
        }
    };

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
                        <li><a href="/admin/products">Catalogo de productos</a></li>
                        <li><a href="/admin/contact">Mensajes</a></li>
                    </ul>

                    <div className="admin-products-back">
                        <a href="/">⬅ Volver a la tienda</a>
                    </div>
                </aside>

                {/* MAIN */}
                <main className="admin-products-main">

                    <h1>Mensajes de Contacto</h1>

                    <div className="filter-bar">
                        <div className="filter-order">
                            <button
                                className={`filter-btn ${sortOrder === "newest" ? "active" : ""}`}
                                onClick={() => setSortOrder("newest")}
                            >
                                Más recientes
                            </button>
                            <button
                                className={`filter-btn ${sortOrder === "oldest" ? "active" : ""}`}
                                onClick={() => setSortOrder("oldest")}
                            >
                                Más antiguos
                            </button>
                        </div>
                        <div className="filter-date">
                            <label htmlFor="date-filter">Fecha:</label>
                            <input
                                id="date-filter"
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                            {filterDate && (
                                <button className="clear-date-btn" onClick={() => setFilterDate("")}>
                                    &times;
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="messages-inbox">

                        {Array.isArray(mensajesFiltrados) && mensajesFiltrados.map(m => (
                            <div 
                                key={m.id} 
                                className={`message-card ${!m.leido ? "unread" : ""}`}
                                onClick={() => setSelectedMessage(m)}
                            >
                                <div className="message-card-header">
                                    <div className="message-avatar">
                                        {m.nombre.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="message-info">
                                        <h4>{m.nombre}</h4>
                                        <span className="message-email-preview">{m.email}</span>
                                    </div>
                                    <div className="message-meta">
                                        {m.creado_en && (
                                            <span className="message-date">
                                                {new Date(m.creado_en).toLocaleDateString('es-ES', { 
                                                    day: '2-digit', 
                                                    month: 'short' 
                                                })}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="message-preview">
                                    {m.mensaje.length > 120 ? m.mensaje.substring(0, 120) + '...' : m.mensaje}
                                </p>

                                <div className="message-card-footer">
                                    <div className="message-badges">
                                        {!m.leido && <span className="badge badge-new">Nuevo</span>}
                                        {m.respondido && <span className="badge badge-responded">Respondido</span>}
                                    </div>
                                    {!m.leido && <span className="unread-dot"></span>}
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* MODAL */}
                    {selectedMessage && (
                        <div className="message-modal-overlay" onClick={() => { setSelectedMessage(null); setReplyText(""); }}>
                            <div className="message-modal" onClick={(e) => e.stopPropagation()}>
                                <div className="message-modal-header">
                                    <div className="message-modal-avatar">
                                        {selectedMessage.nombre.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="message-modal-info">
                                        <h3>{selectedMessage.nombre}</h3>
                                        <span>{selectedMessage.email}</span>
                                    </div>
                    <button className="modal-close-btn" onClick={() => { setSelectedMessage(null); setReplyText(""); }}></button>
                                </div>

                                {selectedMessage.creado_en && (
                                    <p className="message-modal-date">
                                        Enviado el {new Date(selectedMessage.creado_en).toLocaleString('es-ES', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                )}

                                <div className="message-modal-body">
                                    {selectedMessage.mensaje}
                                </div>

                                {!selectedMessage.respondido && (
                                    <div className="message-modal-reply">
                                        <label htmlFor="reply-input">Tu respuesta:</label>
                                        <textarea
                                            id="reply-input"
                                            className="reply-textarea"
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder={`Escribe tu respuesta para ${selectedMessage.nombre}...`}
                                        />
                                    </div>
                                )}

                                <div className="message-modal-actions">
                                    {selectedMessage.respondido ? (
                                        <span className="already-responded">Ya respondido</span>
                                    ) : (
                                        <button
                                            className="btn-send-reply"
                                            onClick={() => responderMensaje(selectedMessage.id)}
                                            disabled={sendingReply}
                                        >
                                            {sendingReply ? "Enviando..." : "Responder y enviar email"}
                                        </button>
                                    )}

                                    {!selectedMessage.leido && (
                                        <button className="btn-mark-read" onClick={() => marcarLeido(selectedMessage.id)}>
                                            Marcar como leído
                                        </button>
                                    )}

                                    <button className="btn-modal-close" onClick={() => { setSelectedMessage(null); setReplyText(""); }}>
                                        Cerrar
                                    </button>

                                    <button className="btn-delete" onClick={() => eliminarMensaje(selectedMessage.id)}>
                                        Eliminar
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