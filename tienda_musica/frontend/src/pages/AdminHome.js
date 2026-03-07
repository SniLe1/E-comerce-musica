import { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminHome.css";

function AdminHome() {
    const [carouselImages, setCarouselImages] = useState([
        "/media/vinilo1.jpg",
        "/media/vinilo2.jpg",
        "/media/vinilo3.jpg"
    ]);

    const [title, setTitle] = useState("Tienda de Música");
    const [description, setDescription] = useState("Compra música en formato físico y digital.\nVinilos, CDs y descargas en alta calidad.");
    const [features, setFeatures] = useState([
        { icon: "🎧", title: "Digital", text: "Descarga inmediata en MP3 y FLAC." },
        { icon: "💿", title: "Físico", text: "Vinilos y CDs con envío a todo el país." },
        { icon: "⭐", title: "Calidad", text: "Música original y sin compresión." }
    ]);

    // Eliminar imagen
    const handleDeleteImage = (index) => {
        const newImages = carouselImages.filter((_, i) => i !== index);
        setCarouselImages(newImages);
    };

    // Agregar imagen como archivo
    const handleAddImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
        const response = await fetch("http://localhost:8000/api/home/admin/home/upload/", {
            method: "POST",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            // El backend debería devolver la URL de la imagen subida
            setCarouselImages([...carouselImages, data.image_url]);
        } else {
            alert("Error al subir la imagen ❌");
        }
        } catch (error) {
        alert("No se pudo conectar con el servidor");
        }
    };

    const handleSave = async () => {
        const payload = {
        carouselImages,
        title,
        description,
        features,
        };

        try {
        const response = await fetch("http://localhost:8000/api/home/admin/home/", {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert("Cambios guardados correctamente ✅");
        } else {
            alert("Error al guardar los cambios ❌");
        }
        } catch (error) {
        alert("No se pudo conectar con el servidor");
        }
    };

    return (
        <div className="admin-container">
        <aside className="admin-sidebar">
            <h2>Panel Admin</h2>
            <ul>
            <li><Link to="/admin/home">Modificar Home</Link></li>
            <li><Link to="/admin/products">Catálogo de Productos</Link></li>
            <li><Link to="/admin/navbar">Links del Navbar</Link></li>
            </ul>
            <div className="admin-back">
            <Link to="/">⬅ Volver a la tienda</Link>
            </div>
        </aside>

        <main className="admin-main">
            <h1>Modificar Home</h1>

            {/* Carrusel */}
            <section className="admin-section">
            <h2>Imágenes del Carrusel</h2>
            {carouselImages.map((img, i) => (
                <div key={i} className="form-group">
                <span>{img}</span>
                <button onClick={() => handleDeleteImage(i)}>Eliminar</button>
                </div>
            ))}
            <div className="form-group">
                <label>Agregar nueva imagen</label>
                <input type="file" onChange={handleAddImage} />
            </div>
            </section>

            {/* Texto principal */}
            <section className="admin-section">
            <h2>Texto Principal</h2>
            <div className="form-group">
                <label>Título</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Descripción</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            </section>

            {/* Features */}
            <section className="admin-section">
            <h2>Características</h2>
            {features.map((f, i) => (
                <div key={i} className="form-group">
                <label>Icono</label>
                <input type="text" value={f.icon} onChange={(e) => {
                    const newFeatures = [...features];
                    newFeatures[i].icon = e.target.value;
                    setFeatures(newFeatures);
                }} />
                <label>Título</label>
                <input type="text" value={f.title} onChange={(e) => {
                    const newFeatures = [...features];
                    newFeatures[i].title = e.target.value;
                    setFeatures(newFeatures);
                }} />
                <label>Texto</label>
                <input type="text" value={f.text} onChange={(e) => {
                    const newFeatures = [...features];
                    newFeatures[i].text = e.target.value;
                    setFeatures(newFeatures);
                }} />
                </div>
            ))}
            </section>

            <button className="btn-save" onClick={handleSave}>Guardar cambios</button>
        </main>
        </div>
    );
}

export default AdminHome;
