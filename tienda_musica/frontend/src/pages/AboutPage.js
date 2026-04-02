import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-wrapper">

      {/* HERO */}
      <section className="about-hero" style={{ backgroundImage: `url('/images/hero.png')` }}>
        <div className="about-hero-content">
          <h1>Sobre Nosotros</h1>
          <p>
            Donde la música se transforma en experiencia.
          </p>
        </div>
      </section>

      {/* BLOQUES */}
      <section className="about-section">

        {/* QUIÉNES SOMOS */}
        <div className="about-block">
          <div className="about-image">
            <img src="/images/about1.png" alt="" />
          </div>
          <div className="about-text">
            <h2>Quiénes somos</h2>
            <p>
              Somos una tienda dedicada a la música en todos sus formatos,
              enfocada en la curaduría y en la experiencia de escuchar.
            </p>
          </div>
        </div>

        {/* QUÉ HACEMOS */}
        <div className="about-block reverse">
          <div className="about-image">
            <img src="/images/about2.png" alt="" />
          </div>
          <div className="about-text">
            <h2>Qué hacemos</h2>
            <p>
              Seleccionamos música con identidad, priorizando calidad,
              estética y una conexión real con el oyente.
            </p>
          </div>
        </div>

        {/* POR QUÉ */}
        <div className="about-block">
          <div className="about-image">
            <img src="/images/about3.png" alt="" />
          </div>
          <div className="about-text">
            <h2>Por qué lo hacemos</h2>
            <p>
              Porque creemos que la música no solo se escucha,
              se siente, se colecciona y se vive.
            </p>
          </div>
        </div>

      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Explora nuestra colección</h2>
        <a href="/products" className="btn-vintage">Ver productos</a>
      </section>

    </div>
  );
}

export default AboutPage;