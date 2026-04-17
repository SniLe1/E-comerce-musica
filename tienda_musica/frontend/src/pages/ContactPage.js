import React, { useState } from "react";
import "./ContactPage.css";
import Toast from "../components/Toast";

function ContactPage() {

  const [toast, setToast] = useState({
    show: false,
    message: ""
  });

  const triggerToast = (message) => {
    setToast({ show: true, message });

    setTimeout(() => {
      setToast({ show: false, message: ""});
    }, 3000);
  }

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/contacto/enviar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        triggerToast("Mensaje enviado con éxito");
        setForm({ nombre: "", email: "", mensaje: "" });
      } else {
        triggerToast("Error al enviar mensaje", "error");
        console.log(data);
      }

    } catch (error) {
      console.error(error);
      triggerToast("Error de conexión", "error");
    }
  };


  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Cuánto tardan los envíos?",
      answer: "Lo que se tenga que tardar."
    },
    {
      question: "¿Hacen envíos internacionales?",
      answer: "A Bolivia no."
    },
    {
      question: "¿Puedo devolver un producto?",
      answer: "No."
    },
    {
      question: "¿Qué pasa si mi producto llega dañado?",
      answer: "Mala cuea."
    }
  ];

  return (
    <>
      <Toast message={toast.message} show={toast.show} />

      <div className="contact-wrapper">

        {/* HERO */}
        <section 
          className="contact-hero"
          style={{ backgroundImage: `url('/images/hero.png')` }}
        >
          <div className="contact-hero-content">
            <h1>Contacto & Ayuda</h1>
            <p>Estamos aquí para ayudarte con lo que necesites</p>
          </div>
        </section>

        {/* CONTACTO */}
        <section className="contact-section container">

          <div className="contact-grid">

            {/* FORMULARIO */}
            <div className="contact-form">
              <h2>Contáctanos</h2>

              <input 
                placeholder="Tu nombre" 
                value={form.nombre} 
                onChange={(e) => setForm({...form, nombre: e.target.value})}
              />
              <input 
                placeholder="Tu correo" 
                value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
              <textarea 
                placeholder="Escribe tu mensaje..."
                value={form.mensaje} 
                onChange={(e) => setForm({...form, mensaje: e.target.value})} 
              />

              <button className="btn-vintage" onClick={handleSubmit}>
                Enviar mensaje
              </button>
            </div>

            {/* INFO */}
            <div className="contact-info">
              <h2>Información</h2>

              <p><strong>Email:</strong> contacto@tienda.cl</p>
              <p><strong>Teléfono:</strong> +56 9 1234 5678</p>
              <p><strong>Ubicación:</strong> Chile</p>

              <div className="contact-note">
                Respondemos dentro de 24 horas.
              </div>
            </div>

          </div>

        </section>

        {/* FAQ */}
        <section className="faq-section container">

          <h2>Preguntas Frecuentes</h2>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openFAQ === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  {faq.question}
                </div>

                {openFAQ === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </section>

      </div>
    </>
  );
}

export default ContactPage;