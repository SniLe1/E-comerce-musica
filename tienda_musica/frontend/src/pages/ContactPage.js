import React, { useState } from "react";
import "./ContactPage.css";

function ContactPage() {

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

            <input placeholder="Tu nombre" />
            <input placeholder="Tu correo" />
            <textarea placeholder="Escribe tu mensaje..." />

            <button className="btn-vintage">
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
  );
}

export default ContactPage;