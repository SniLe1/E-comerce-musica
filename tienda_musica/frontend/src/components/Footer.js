import React, {useEffect, useState} from "react";
import "./Footer.css";

function Footer() {

    return (
        <footer class="footer">
            <div class="footer-container">

                <div class="footer-section">
                    <h3>🎶 RetroVinyl</h3>
                    <p>La mejor selección de discos clásicos y ediciones especiales.</p>
                </div>

                <div class="footer-section">
                    <h4>Información</h4>
                    <ul>
                        <li><a href="#">Quiénes somos</a></li>
                        <li><a href="#">Envíos</a></li>
                        <li><a href="#">Términos y condiciones</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Contacto</h4>
                    <p>Email: contacto@retrovinyl.cl</p>
                    <p>Tel: +56 9 1234 5678</p>
                    <p>Santiago, Chile</p>
                </div>

                <div class="footer-section">
                    <h4>Síguenos</h4>
                    <p>Instagram</p>
                    <p>Facebook</p>
                </div>

            </div>

            <div class="footer-bottom">
                © 2026 RetroVinyl - Todos los derechos reservados
            </div>
        </footer>
            );
        }

export default Footer;