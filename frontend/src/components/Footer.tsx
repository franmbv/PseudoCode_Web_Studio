import './Footer.css'; 

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
            href="https://github.com/MI_USUARIO_DE_GITHUB" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-link"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            href="https://tiktok.com/@MI_USUARIO_DE_TIKTOK" 
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