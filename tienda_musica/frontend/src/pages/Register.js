import { useState } from "react";
import "./Register.css";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, visible: false }));

    setTimeout(() => {
      setNotification(null);
    }, 300); // duración del fadeOut
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({
          type: "success",
          text: "Usuario creado correctamente 🎉, revisa tu correo",
          visible: true
        });

        setUsername("");
        setEmail("");
        setPassword("");

      } else {
        const firstKey = Object.keys(data)[0];
        const backendMessage = data[firstKey][0];

        setNotification({
          type: "validation",
          text: backendMessage,
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

    // Cerrar después de 3 segundos (con animación)
    setTimeout(() => {
      closeNotification();
    }, 3000);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Crear Cuenta</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Registrarse</button>
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


export default Register;
