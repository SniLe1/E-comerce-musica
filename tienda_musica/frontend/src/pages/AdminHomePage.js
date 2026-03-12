import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminPage.css";

function AdminHomePage() {
    const [config, setConfig] = useState({
        title: "",
        description: "",
        features: [],
    });

    const [images, setImages] = useState([]);


    // CARGAR DATOS
    useEffect(() => {
        fetch("http://localhost:8000/api/home/config/")
        .then((res) => res.json())
        .then((data) => setConfig(data));

        fetch("http://localhost:8000/api/home/images/")
        .then((res) => res.json())
        .then((data) => setImages(data));
    }, []);


    // GUARDAR CONFIG
    const saveConfig = () => {
        fetch("http://localhost:8000/api/home/config/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
        });

        alert("Configuración guardada");
    };


    // SUBIR IMAGEN
    const uploadImage = (e) => {
        const file = e.target.files[0];

        const formData = new FormData();

        formData.append("image", file);

        fetch("http://localhost:8000/api/home/images/", {
        method: "POST",
        body: formData,
        })
        .then((res) => res.json())
        .then((data) => setImages([...images, data]));
    };


    // ELIMINAR IMAGEN
    const deleteImage = (id) => {
        fetch(`http://localhost:8000/api/home/images/${id}/`, {
        method: "DELETE",
        });

        setImages(images.filter((img) => img.id !== id));
    };

    return (
        <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
            <div>
            <h2>Panel Admin</h2>

            <ul>
                <li>
                    <Link to="/admin/home">Modificar Home</Link>
                </li>
                <li>
                    <Link to="/admin/products">Catálogo de Productos</Link>
                </li>
                <li>
                    <Link to="/admin/navbar">Links del Navbar</Link>
                </li>
            </ul>
            </div>

            <div className="admin-back">
                <Link to="/">⬅ Volver a la tienda</Link>
            </div>
        </aside>

        {/* Contenido */}
        <main className="admin-main">
            <h1>Editar Home</h1>

            <h3>Título</h3>

            <input
            value={config.title}
            onChange={(e) => setConfig({ ...config, title: e.target.value })}
            />

            <h3>Descripción</h3>

            <textarea
            value={config.description}
            onChange={(e) =>
                setConfig({ ...config, description: e.target.value })
            }
            />

            <br />
            <br />

            <button onClick={saveConfig}>Guardar cambios</button>

            <hr />

            <h2>Imágenes del Carrusel</h2>

            <input type="file" onChange={uploadImage} />

            <br />
            <br />

            <div style={{ display: "flex", gap: "20px" }}>
            {images.map((img) => (
                <div key={img.id}>
                <img src={img.image_url} width="200" />

                <br />

                <button onClick={() => deleteImage(img.id)}>Eliminar</button>
                </div>
            ))}
            </div>
        </main>
        </div>
    );
}

export default AdminHomePage;
