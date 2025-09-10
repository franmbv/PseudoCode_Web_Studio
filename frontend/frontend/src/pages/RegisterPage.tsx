import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout'; 
import './AuthPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al registrar el usuario.');
      }
      setSuccess('¡Usuario registrado con éxito! Serás redirigido al login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Ocurrió un error inesperado.');
    }
  };
  
  return (
    // 2. Usamos el AuthLayout
    <AuthLayout>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Crear una Cuenta</h2>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="auth-button">Registrarse</button>
        {error && <p className="error-message auth-feedback">{error}</p>}
        {success && <p className="success-message auth-feedback">{success}</p>}
        <p className="auth-switch">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;