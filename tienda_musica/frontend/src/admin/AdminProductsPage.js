import React, { useEffect, useState, useMemo } from "react";
import "./AdminProductsPage.css";

function AdminProducts() {

    const [productos, setProductos] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editImage, setEditImage] = useState(null);

    const [newProduct, setNewProduct] = useState({
        titulo: "",
        artista: "",
        descripcion: "",
        formato: "vinilo",
        precio: "",
        stock: ""
    });

    const [image, setImage] = useState(null);
    const [sortOrder, setSortOrder] = useState("newest");

    // =============================
    // NOTIFICACION
    // =============================

    const [notification, setNotification] = useState(null);

    let timeout1;
    let timeout2;

    const showNotification = (message, type = "success") => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);

        setNotification({ message, type, visible: true });

        timeout1 = setTimeout(() => {
            setNotification({ message, type, visible: false });
        }, 2500);

        timeout2 = setTimeout(() => {
            setNotification(null);
        }, 3000);
    };


    // =============================
    // CARGAR PRODUCTOS
    // =============================
    useEffect(() => {
        fetch("http://localhost:8000/api/tienda/productos/")
        .then(res => res.json())
        .then(data => setProductos(data));
    }, []);

    // =============================
    // ORDENAR PRODUCTOS
    // =============================
    const productosOrdenados = useMemo(() => {
        const sorted = [...productos];
        sorted.sort((a, b) => sortOrder === "newest" ? b.id - a.id : a.id - b.id);
        return sorted;
    }, [productos, sortOrder]);

    // =============================
    // CREAR PRODUCTO
    // =============================
    const createProduct = async () => {

        const formData = new FormData();

        Object.keys(newProduct).forEach(key => {
            formData.append(key, newProduct[key]);
        });

        if (image) {
            formData.append("imagen", image);
        }

        const res = await fetch("http://localhost:8000/api/tienda/productos/", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            setProductos([...productos, data]);

            setNewProduct({
                titulo: "",
                artista: "",
                descripcion: "",
                formato: "vinilo",
                precio: "",
                stock: ""
            });
            showNotification("Producto creado con éxito");

            setImage(null);
        } else {
            showNotification("Error al crear producto", "error");
            console.log(data);
        }
    };

    // =============================
    // ELIMINAR PRODUCTO
    // =============================
    const deleteProduct = async (id) => {
        await fetch(`http://localhost:8000/api/tienda/productos/${id}/`, {
            method: "DELETE"
        });

        setProductos(productos.filter(p => p.id !== id));
        showNotification("Se ha eliminado el producto");
    };

    // =============================
    // EDITAR PRODUCTO
    // =============================
    const updateProduct = async () => {

        const formData = new FormData();

        formData.append("titulo", editingProduct.titulo);
        formData.append("artista", editingProduct.artista);
        formData.append("descripcion", editingProduct.descripcion);
        formData.append("formato", editingProduct.formato);
        formData.append("precio", Number(editingProduct.precio));
        formData.append("stock", Number(editingProduct.stock));


        if (editImage) {
            formData.append("imagen", editImage);
        }

        const res = await fetch(
            `http://localhost:8000/api/tienda/productos/${editingProduct.id}/`,
            {
                method: "PATCH",
                body: formData
            }
        );

        const data = await res.json();

        if (res.ok) {
            setProductos(
                productos.map(p => p.id === data.id ? data : p)
            );
            setEditingProduct(null);
            setEditImage(null);

            setTimeout(() => {
                showNotification("Producto editado con éxito");
            }, 100);
        } else {
            console.log(data);
            showNotification("Error al editar producto", "error");
        }
    };

    return (
        <>
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
                        <li><a href="/admin/products">Catálogo de Productos</a></li>
                        <li><a href="/admin/contact">Mensajes</a></li>
                    </ul>

                    <div className="adminhome-back">
                        <a href="/">⬅ Volver a la tienda</a>
                    </div>
                </aside>

                {/* MAIN */}
                <main className="admin-products-main">

                    <h1>Administrar Productos</h1>

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
                    </div>

                    <div className="adminpro-grid-2">

                        {/* ================= LISTA ================= */}

                        <div className="adminpro-list-section">

                            <h2 className="adminpro-subtitle">
                                Productos ({productos.length})
                            </h2>

                            <div className="products-grid-admin">

                                {productosOrdenados.map(p => (

                                    <div key={p.id} className="product-card-admin">

                                        <div className="product-card-img-wrap">
                                            <img src={p.imagen} alt="" />
                                        </div>

                                        <div className="product-card-body">
                                            <h4>{p.titulo}</h4>
                                            <p>{p.artista}</p>
                                            <span className="product-formato">{p.formato}</span>
                                            <span className="product-precio">${p.precio}</span>
                                        </div>

                                        <div className="product-actions">
                                            <button
                                                className="adminpro-btn-edit"
                                                onClick={() => setEditingProduct({...p})}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="adminpro-btn-delete"
                                                onClick={() => deleteProduct(p.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* ================= CREAR ================= */}

                        <div className="adminpro-create-section">

                            <div className="adminpro-create-card">
                                <h3>Crear Producto</h3>

                                <input
                                    className="adminpro-input"
                                    placeholder="Título"
                                    value={newProduct.titulo}
                                    onChange={e => setNewProduct({...newProduct, titulo: e.target.value})}
                                />

                                <input
                                    className="adminpro-input"
                                    placeholder="Artista"
                                    value={newProduct.artista}
                                    onChange={e => setNewProduct({...newProduct, artista: e.target.value})}
                                />

                                <textarea
                                    className="adminpro-textarea"
                                    placeholder="Descripción"
                                    value={newProduct.descripcion}
                                    onChange={e => setNewProduct({...newProduct, descripcion: e.target.value})}
                                />

                                <div className="adminpro-inline-group">
                                    <select
                                        className="adminpro-input"
                                        value={newProduct.formato}
                                        onChange={e => setNewProduct({...newProduct, formato: e.target.value})}
                                    >
                                        <option value="vinilo">Vinilo</option>
                                        <option value="cd">CD</option>
                                        <option value="digital">Digital</option>
                                    </select>

                                    <input
                                        className="adminpro-input"
                                        placeholder="Precio"
                                        type="number"
                                        value={newProduct.precio}
                                        onChange={e => setNewProduct({...newProduct, precio: e.target.value})}
                                    />
                                </div>

                                <div className="adminpro-inline-group">
                                    <input
                                        className="adminpro-input"
                                        placeholder="Stock"
                                        type="number"
                                        value={newProduct.stock}
                                        onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                                    />

                                    <input
                                        className="adminpro-input-file"
                                        type="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>

                                <button className="adminpro-btn" onClick={createProduct}>
                                    Crear Producto
                                </button>
                            </div>

                        </div>

                    </div>

                    {/* ================= MODAL EDITAR ================= */}

                    {editingProduct !== null && (

                        <div className="message-modal-overlay" onClick={() => setEditingProduct(null)}>

                            <div className="message-modal" onClick={(e) => e.stopPropagation()}>

                                <div className="message-modal-header">
                                    <div className="message-modal-info">
                                        <h3>Editar Producto</h3>
                                    </div>
                                    <button className="modal-close-btn" onClick={() => setEditingProduct(null)}></button>
                                </div>

                                <div className="message-modal-body">

                                    <div className="form-row">
                                        <label>Título</label>
                                        <input
                                            className="adminpro-input"
                                            value={editingProduct.titulo || ""}
                                            onChange={(e) =>
                                                setEditingProduct({...editingProduct, titulo: e.target.value})
                                            }
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label>Artista</label>
                                        <input
                                            className="adminpro-input"
                                            value={editingProduct.artista || ""}
                                            onChange={(e) =>
                                                setEditingProduct({...editingProduct, artista: e.target.value})
                                            }
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label>Descripción</label>
                                        <textarea
                                            className="adminpro-textarea"
                                            value={editingProduct.descripcion || ""}
                                            onChange={(e) =>
                                                setEditingProduct({...editingProduct, descripcion: e.target.value})
                                            }
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label>Formato</label>
                                        <select
                                            className="adminpro-input"
                                            value={editingProduct.formato || "vinilo"}
                                            onChange={(e) =>
                                                setEditingProduct({...editingProduct, formato: e.target.value})
                                            }
                                        >
                                            <option value="vinilo">Vinilo</option>
                                            <option value="cd">CD</option>
                                            <option value="digital">Digital</option>
                                        </select>
                                    </div>

                                    <div className="form-row">
                                        <label>Precio</label>
                                        <input
                                            className="adminpro-input"
                                            type="number"
                                            value={editingProduct.precio || ""}
                                            onChange={(e) =>
                                                setEditingProduct({...editingProduct, precio: e.target.value})
                                            }
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label>Stock</label>
                                        <input
                                            className="adminpro-input"
                                            type="number"
                                            value={editingProduct.stock || ""}
                                            onChange={(e) =>
                                                setEditingProduct({...editingProduct, stock: e.target.value})
                                            }
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label>Imagen</label>
                                        <input
                                            className="adminpro-input-file"
                                            type="file"
                                            onChange={(e) => setEditImage(e.target.files[0])}
                                        />
                                    </div>

                                </div>

                                <div className="message-modal-actions">
                                    <button className="btn-send-reply" onClick={updateProduct}>
                                        Guardar cambios
                                    </button>
                                    <button className="btn-modal-close" onClick={() => setEditingProduct(null)}>
                                        Cancelar
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

export default AdminProducts;
