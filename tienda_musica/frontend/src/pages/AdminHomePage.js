import React, { useEffect, useState } from "react";
import "./AdminHomePage.css";

function AdminHomePage() {

    const [hero, setHero] = useState({
        title: "",
        description: "",
        button_text: ""
    });

    const [features, setFeatures] = useState([]);
    const [newFeature, setNewFeature] = useState({
        icon: "",
        title: "",
        text: ""
    });

    const [carousel, setCarousel] = useState([]);
    const [newImage, setNewImage] = useState(null);


    // NOTIFICACION

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

    // CARGAR DATA
    useEffect(() => {

        fetch("http://localhost:8000/api/home/")
        .then(res => res.json())
        .then(data => {

            setHero(data.hero || {});
            setFeatures(data.features || []);
            setCarousel(data.carousel || []);
        });

    }, []);


    // HERO
    const saveHero = async () => {

        await fetch("http://localhost:8000/api/home/hero/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hero)
        });

        showNotification("Hero actualizado");
    };


    // FEATURES
    const addFeature = async () => {

        const res = await fetch("http://localhost:8000/api/home/features/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newFeature)
        });

        const data = await res.json();

        setFeatures([...features, data]);

        setNewFeature({
            icon: "",
            title: "",
            text: ""
        });

        showNotification("Feature agregada");
    };

    const deleteFeature = async (id) => {

        await fetch(`http://localhost:8000/api/home/features/${id}/`, {
            method: "DELETE"
        });

        setFeatures(features.filter(f => f.id !== id));
        showNotification("Feature eliminada");
    };

    // Editar feature
    const updateFeature = async (feature) => {

        const res = await fetch(
            `http://localhost:8000/api/home/features/${feature.id}/`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(feature)
            });

        showNotification("Feature editada");
        const data = await res.json();

        setFeatures(
            features.map(f => f.id === data.id ? data : f)
        );
    };


    // CARRUSEL
    const uploadImage = async () => {

        if (!newImage) {
            showNotification("Selecciona una imagen", "error");
            return;
        }

        const formData = new FormData();
        formData.append("image", newImage);

        const res = await fetch("http://localhost:8000/api/home/carousel/", {
            method: "POST",
            body: formData
        });

        if (res.ok) window.location.reload();
        showNotification("Imagen nueva actualizada");
    };

    const deleteImage = async (id) => {

        await fetch(`http://localhost:8000/api/home/carousel/delete/${id}/`, {
            method: "DELETE"
        });

        setCarousel(carousel.filter(img => img.id !== id));
        showNotification("Imagen eliminada");
    };

    return (
        <>
            {notification && (
                <div className={`toast_home ${notification.type} ${notification.visible ? "show" : "hide"}`}>
                    {notification.message}
                </div>
            )}

            <div className="adminhome-container">

                {/* SIDEBAR */}

                <aside className="adminhome-sidebar">

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


                {/* MAIN */}

                <main className="adminhome-main">

                    <h1 className="adminhome-title">
                        Editor del Home
                    </h1>


                    {/* HERO */}

                    <div className="adminhome-section">

                        <h2 className="adminhome-subtitle">
                            Hero Section
                        </h2>

                        <div className="adminhome-card">

                            <input
                                className="adminhome-input"
                                placeholder="Título"
                                value={hero.title}
                                onChange={(e) =>
                                    setHero({...hero, title: e.target.value})
                                }
                            />

                            <textarea
                                className="adminhome-textarea"
                                placeholder="Descripción"
                                value={hero.description}
                                onChange={(e) =>
                                    setHero({...hero, description: e.target.value})
                                }
                            />

                            <input
                                className="adminhome-input"
                                placeholder="Texto botón"
                                value={hero.button_text}
                                onChange={(e) =>
                                    setHero({...hero, button_text: e.target.value})
                                }
                            />

                            <button
                                className="adminhome-btn"
                                onClick={saveHero}
                            >
                                Guardar Hero
                            </button>

                        </div>

                    </div>


                    {/* CARRUSEL */}

                    <div className="adminhome-section">

                        <h2 className="adminhome-subtitle">
                            Carrusel
                        </h2>

                        <div className="adminhome-card">

                            <input
                                type="file"
                                className="adminhome-input"
                                onChange={(e)=>setNewImage(e.target.files[0])}
                            />

                            <button
                                className="adminhome-btn"
                                onClick={uploadImage}
                            >
                                Subir imagen
                            </button>

                            <div className="carousel-admin-grid">

                                {carousel.map(img => (

                                    <div key={img.id}>

                                        <img src={img.image_url} />

                                        <button
                                            className="adminhome-btn adminhome-btn-delete"
                                            onClick={()=>deleteImage(img.id)}
                                        >
                                            Eliminar
                                        </button>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>


                    {/* FEATURES */}

                    <div className="adminhome-section">

                        <h2 className="adminhome-subtitle">
                            Features
                        </h2>

                        <div className="adminhome-card">

                            {features.map(f => (

                            <div key={f.id} className="feature-row">

                                <span>{f.icon}</span>

                                <input
                                    value={f.title}
                                    onChange={(e) => {

                                        const updated = {...f, title: e.target.value}

                                        setFeatures(
                                            features.map(x =>
                                                x.id === f.id ? updated : x
                                            )
                                        )

                                    }}
                                />

                                <input
                                    value={f.text}
                                    onChange={(e) => {

                                        const updated = {...f, text: e.target.value}

                                        setFeatures(
                                            features.map(x =>
                                                x.id === f.id ? updated : x
                                            )
                                        )

                                    }}
                                />

                                <button
                                    className="adminhome-btn"
                                    onClick={() => updateFeature(f)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="adminhome-btn adminhome-btn-delete"
                                    onClick={() => deleteFeature(f.id)}
                                >
                                    Borrar
                                </button>

                            </div>

                            ))}

                            <h3 className="adminhome-subtitle">
                                Agregar Feature
                            </h3>

                            <input
                                className="adminhome-input"
                                placeholder="Icono"
                                value={newFeature.icon}
                                onChange={(e)=>
                                    setNewFeature({...newFeature, icon:e.target.value})
                                }
                            />

                            <input
                                className="adminhome-input"
                                placeholder="Título"
                                value={newFeature.title}
                                onChange={(e)=>
                                    setNewFeature({...newFeature, title:e.target.value})
                                }
                            />

                            <input
                                className="adminhome-input"
                                placeholder="Texto"
                                value={newFeature.text}
                                onChange={(e)=>
                                    setNewFeature({...newFeature, text:e.target.value})
                                }
                            />

                            <button
                                className="adminhome-btn"
                                onClick={addFeature}
                            >
                                + Agregar Feature
                            </button>

                        </div>

                    </div>

                </main>

            </div>
        </>

    );
}

export default AdminHomePage;