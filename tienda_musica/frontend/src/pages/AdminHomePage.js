import React, { useEffect, useState } from "react";
import "./AdminPage.css";

function AdminHomePage() {

    const [hero, setHero] = useState({
        title: "",
        description: "",
        button_text: ""
    });

    const [features, setFeatures] = useState([]);
    const [carousel, setCarousel] = useState([]);
    const [newImage, setNewImage] = useState(null);

    // CARGAR DATA DEL HOME
    useEffect(() => {

        fetch("http://localhost:8000/api/home/")
        .then(res => res.json())
        .then(data => {

            setHero(data.hero || {});
            setFeatures(data.features || []);
            setCarousel(data.carousel || []);
        });
    }, []);


    // GUARDAR HERO
    const saveHero = async () => {

        await fetch("http://localhost:8000/api/home/hero/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hero)
        });

        alert("Hero actualizado");
    };


    // SUBIR IMAGEN
const uploadImage = async () => {

    if (!newImage) {
        alert("Selecciona una imagen primero");
        return;
    }

    const formData = new FormData();
    formData.append("image", newImage);

    const res = await fetch("http://localhost:8000/api/home/carousel/", {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
        window.location.reload();
    } else {
        alert("Error subiendo imagen");
    }
};

    // ELIMINAR IMAGEN
    const deleteImage = async (id) => {

        await fetch(`http://localhost:8000/api/home/carousel/delete/${id}/`, {
        method: "DELETE"
        });

        setCarousel(carousel.filter(img => img.id !== id));

    };


    return (

        <div className="admin-container">

        <aside className="admin-sidebar">

            <h2>Panel Admin</h2>

            <ul>
                <li><a href="/admin/home">Modificar Home</a></li>
                <li><a href="/admin/products">Catálogo de Productos</a></li>
                <li><a href="/admin/navbar">Links del Navbar</a></li>
            </ul>

            <div className="admin-back">
                <a href="/">⬅ Volver a la tienda</a>
            </div>

        </aside>

        <main className="admin-main">

            <h1>Editar Home</h1>

            {/* HERO */}
            <h3>Hero Section</h3>

            <input
            type="text"
            placeholder="Título"
            value={hero.title}
            onChange={(e) =>
                setHero({ ...hero, title: e.target.value })
            }
            />

            <textarea
            placeholder="Descripción"
            value={hero.description}
            onChange={(e) =>
                setHero({ ...hero, description: e.target.value })
            }
            />

            <input
            type="text"
            placeholder="Texto botón"
            value={hero.button_text}
            onChange={(e) =>
                setHero({ ...hero, button_text: e.target.value })
            }
            />

            <button onClick={saveHero}>
            Guardar Hero
            </button>

            {/* CARRUSEL */}
            <h3 style={{marginTop:"40px"}}>Carrusel</h3>

            <input
            type="file"
            onChange={(e)=>setNewImage(e.target.files[0])}
            />

            <button onClick={uploadImage}>
            Subir imagen
            </button>


            <div style={{display:"flex",gap:"20px",marginTop:"20px"}}>

            {carousel.map(img => (

                <div key={img.id}>

                <img
                    src={img.image_url}
                    style={{width:"150px"}}
                />

                <button
                    onClick={()=>deleteImage(img.id)}>
                    Eliminar
                </button>
                </div>
            ))}
            </div>
        </main>
        </div>
    );
}

export default AdminHomePage;