// src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Importar hook
import './Navbar.css';

import logoImage from '../assets/logo.png';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth(); // <-- Obtener estado y funciones
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigir al login después de cerrar sesión
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoImage} alt="PseInt Web Studio Logo" className="navbar-logo-img" />
         
        </Link>
        <ul className="nav-menu">
          {isAuthenticated ? (
            // Si el usuario está autenticado
            <>
              <li className="nav-item">
                <span className="nav-welcome">¡Hola, {user?.username}!</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links-btn">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            // Si el usuario NO está autenticado
            <>
              <li className="nav-item">
                <Link to="/register" className="nav-links">
                  Registrarse
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-links">
                  Iniciar Sesión
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;