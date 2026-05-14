import { Link } from "react-router-dom";
import "./AdminPage.css";

function AdminPage() {
    return (
        <div className="admin-container">
        {/* Sidebar izquierda */}
        <aside className="admin-sidebar">
            <h2>Panel Admin</h2>
            <ul>
                <li><Link to="/admin/home">Modificar Home</Link></li>
                <li><Link to="/admin/products">Catálogo de Productos</Link></li>
                <li><Link to="/admin/contact">Mensajes</Link></li>
            </ul>
            {/* Botón volver */}
            <div className="admin-back">
                <Link to="/">⬅ Volver a la tienda</Link>
            </div>
        </aside>

        {/* Contenido principal */}
        <main className="admin-main">
            <h1>Bienvenido al Panel de Administración</h1>
            <p>Selecciona una sección en el menú lateral para comenzar a modificar.</p>
        </main>
        </div>
    );
}

export default AdminPage;
