import './Footer.css'; // Crearemos este archivo a continuación
//import { FaGithub, FaTiktok } from 'react-icons/fa'; // Iconos para redes sociales

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-copyright">
          © {currentYear} Pseudocodex. Todos los derechos reservados.
        </div>
        <div className="footer-socials">
          {/* <a 
            href="https://github.com/TU_USUARIO_DE_GITHUB" // <-- ¡IMPORTANTE: Reemplaza con tu usuario!
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-link"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            href="https://tiktok.com/@TU_USUARIO_DE_TIKTOK" // <-- ¡IMPORTANTE: Reemplaza con tu usuario!
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-link"
            aria-label="TikTok"
          >
            <FaTiktok />
          </a>} */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;