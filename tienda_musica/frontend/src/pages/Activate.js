import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Activate() {
  const { uid, token } = useParams();
  const [message, setMessage] = useState("Activando cuenta...");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/activate/${uid}/${token}/`)
      .then(res => res.text())
      .then(data => {
        setMessage(data);
      })
      .catch(() => {
        setMessage("Error activando la cuenta ❌");
      });
  }, [uid, token]);

  setTimeout(() => {
    navigate("/login");
  }, 3000); 

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h2>{message}</h2>
    </div>

  );
}

export default Activate;
