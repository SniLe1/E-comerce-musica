import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { jwtDecode } from "jwt-decode";



function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, visible: false }));

    setTimeout(() => {
      setNotification(null);
    }, 300);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {

        // 🔐 Guardar tokens
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        // 👑 Decodificar token y guardar si es admin
        const decoded = jwtDecode(data.access);
        localStorage.setItem("isAdmin", decoded.is_staff); 


        setNotification({
          type: "success",
          text: "Inicio de sesión exitoso 🎉",
          visible: true
        });

        setTimeout(() => {
          window.location.href = "/";;
        }, 1500);

      } else {
        setNotification({
          type: "validation",
          text: "Usuario o contraseña incorrectos",
          visible: true
        });
      }

    } catch (error) {
      setNotification({
        type: "connection",
        text: "No se pudo conectar con el servidor ❌",
        visible: true
      });
    }

    setTimeout(() => {
      closeNotification();
    }, 3000);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>

      {notification && (
        <div className="overlay" onClick={closeNotification}>
          <div
            className={`popup ${notification.type} ${notification.visible ? "show" : "hide"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {notification.text}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
