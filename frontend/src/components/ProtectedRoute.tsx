// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner'; // Usaremos el spinner mientras se verifica el estado

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth(); // Asumiremos que AuthContext expone un 'isLoading'

  // Si estamos comprobando el estado inicial (leyendo de localStorage), mostramos un spinner
  if (isLoading) {
    return <Spinner />;
  }

  // Si después de comprobar, no está autenticado, redirigir a /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizar el contenido de la ruta hija (la página que se quiere ver)
  return <Outlet />;
}

export default ProtectedRoute;