import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import './AuthPage.css';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const usernameToSubmit = username.toLowerCase();
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.login}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameToSubmit, password }),
      });
      if (!response.ok) throw new Error('Usuario o contraseña incorrectos.');
      const data = await response.json();
      login(data);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Ocurrió un error inesperado.');
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="auth-button">Entrar</button>
        {error && <p className="error-message auth-feedback">{error}</p>}
        <p className="auth-switch">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;