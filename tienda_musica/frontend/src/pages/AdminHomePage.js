import { useEffect, useState } from "react";

function AdminHomePage() {
    const [config, setConfig] = useState({
    title: "",
    description: "",
    features: [],
    });

    const [images, setImages] = useState([]);

  // CARGAR CONFIG
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

  // BORRAR IMAGEN
    const deleteImage = (id) => {
    fetch(`http://localhost:8000/api/home/images/${id}/`, {
        method: "DELETE",
    });

    setImages(images.filter((img) => img.id !== id));
    };

    return (
    <div>
        <h1>Editar Home</h1>

        <h2>Título</h2>

        <input
            value={config.title}
            onChange={(e) => setConfig({ ...config, title: e.target.value })}
        />

        <h2>Descripción</h2>

        <textarea
            value={config.description}
            onChange={(e) => setConfig({ ...config, description: e.target.value })}
        />

        <button onClick={saveConfig}>Guardar Cambios</button>
        <hr />
        <h2>Imágenes del Carrusel</h2>
        <input type="file" onChange={uploadImage} />

        <div style={{ display: "flex", gap: "20px" }}>
        {images.map((img) => (
            <div key={img.id}>
            <img src={img.image_url} width="200" />

            <button onClick={() => deleteImage(img.id)}>Eliminar</button>
            </div>
        ))}
        </div>
    </div>
    );
}

export default AdminHomePage;
