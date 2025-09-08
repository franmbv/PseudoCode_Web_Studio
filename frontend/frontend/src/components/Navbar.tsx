import { Link } from 'react-router-dom';
import './Navbar.css'; // Crearemos este archivo de estilos a continuación

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          PseInt Web Studio
        </Link>
        {/* Aquí podríamos añadir más enlaces en el futuro, como "Login" o "Perfil" */}
      </div>
    </nav>
  );
}

export default Navbar;