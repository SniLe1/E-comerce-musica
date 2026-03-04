import React from "react";
import "./Toast.css";

function Toast({ message, show }) {
  return (
    <div className={`toast ${show ? "show" : ""}`}>
      <span className="toast-icon">🛒</span>
      {message}
    </div>
  );
}

export default Toast;
