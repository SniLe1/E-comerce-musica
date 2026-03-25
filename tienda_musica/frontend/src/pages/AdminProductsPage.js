import React, { useEffect, useState } from "react";
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

    // =============================
    // ENotificacion
    // =============================

    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type, visible: true });

        // inicia salida
        setTimeout(() => {
            setNotification((prev) => ({ ...prev, visible: false }));
        }, 2500);
        
        // elimina del DOM
        setTimeout(() => {
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
            }, 100); // pequeño delay
            
        } else {
            console.log(data);
            showNotification("Error al editar producto", "error");
        }
    };

    return (
        <div className="admin-products-container">

            {notification && (
                <div className={`toast ${notification.type} ${notification.visible ? "show" : "hide"}`}>
                    {notification.message}
                </div>
            )}

            {/* SIDEBAR */}
            <aside className="admin-products-sidebar">
                <h2>Panel Admin</h2>
                <ul>
                    <li><a href="/admin/home">Modificar Home</a></li>
                    <li><a href="/admin/products">Catálogo de Productos</a></li>
                    <li><a href="/admin/navbar">Links del Navbar</a></li>
                </ul>

                <div className="admin-products-back">
                    <a href="/">⬅ Volver a la tienda</a>
                </div>
            </aside>

            {/* MAIN */}
            <main className="admin-products-main">

                <h1>Administrar Productos</h1>

                {/* ================= CREAR ================= */}
                <div className="create-product-card">
                    <h3>Crear Producto</h3>

                    <input
                        placeholder="Título"
                        value={newProduct.titulo}
                        onChange={e => setNewProduct({...newProduct, titulo: e.target.value})}
                    />

                    <input
                        placeholder="Artista"
                        value={newProduct.artista}
                        onChange={e => setNewProduct({...newProduct, artista: e.target.value})}
                    />

                    <textarea
                        placeholder="Descripción"
                        value={newProduct.descripcion}
                        onChange={e => setNewProduct({...newProduct, descripcion: e.target.value})}
                    />

                    <select
                        value={newProduct.formato}
                        onChange={e => setNewProduct({...newProduct, formato: e.target.value})}
                    >
                        <option value="vinilo">Vinilo</option>
                        <option value="cd">CD</option>
                        <option value="digital">Digital</option>
                    </select>

                    <input
                        placeholder="Precio"
                        type="number"
                        value={newProduct.precio}
                        onChange={e => setNewProduct({...newProduct, precio: e.target.value})}
                    />

                    <input
                        placeholder="Stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                    />

                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button onClick={createProduct}>
                        Crear Producto
                    </button>
                </div>

                {/* ================= LISTA ================= */}
                <div className="products-grid-admin">

                    {productos.map(p => (

                        <div key={p.id} className="product-card-admin">

                            <img src={p.imagen} alt="" />

                            <h4>{p.titulo}</h4>
                            <p>{p.artista}</p>

                            <div className="product-actions">

                                <button onClick={() => setEditingProduct({...p})}>Editar</button>

                                <button onClick={() => deleteProduct(p.id)}>
                                    Eliminar
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

                {editingProduct !== null && (
                    
                    <div className="pico-overlay" onClick={() => setEditingProduct(null)}>


                        <div className="pico" onClick={(e) => e.stopPropagation()}>

                            <h3>Editar Producto</h3>

                            <div className="form-row">
                                <label>Título</label>
                                <input 
                                    value={editingProduct.titulo || ""}
                                    onChange={(e) =>
                                        setEditingProduct({...editingProduct, titulo: e.target.value})
                                    }
                                />
                            </div>

                            <div className="form-row">
                                <label>Artista</label>
                                <input
                                    value={editingProduct.artista || ""}
                                    onChange={(e) =>
                                        setEditingProduct({...editingProduct, artista: e.target.value})
                                    }
                                />
                            </div>

                            <div className="form-row">
                                <label>Descripción</label>
                                <textarea
                                    value={editingProduct.descripcion || ""}
                                    onChange={(e) =>
                                        setEditingProduct({...editingProduct, descripcion: e.target.value})
                                    }
                                />
                            </div>

                            <div className="form-row">
                                <label>Formato</label>
                                <select
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
                                    type="file"
                                    onChange={(e) => setEditImage(e.target.files[0])}
                                />
                            </div>

                            <button onClick={updateProduct}>
                                Guardar cambios
                            </button>

                            <button onClick={() => setEditingProduct(null)}>
                                Cancelar
                            </button>

                        </div>

                    </div>
                )}

            </main>
        </div>
    );
}

export default AdminProducts;