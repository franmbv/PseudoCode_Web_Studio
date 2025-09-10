// src/components/AuthLayout.tsx
import React from 'react';
import logoImage from '../assets/logo1.svg'; // Asegúrate de que la ruta a tu logo sea correcta
import './AuthLayout.css';

interface AuthLayoutProps {
  children: React.ReactNode; // 'children' es una prop especial en React para pasar componentes
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout-container">
      {/* Columna Izquierda: Branding */}
      <div className="auth-layout-left">
        <h1>Bienvenido a</h1>
        <img src={logoImage} alt="PseInt Web Studio Logo" className="auth-layout-logo" />
        <p>Tu plataforma interactiva para dominar la lógica de programación.</p>
      </div>

      {/* Columna Derecha: Contenido Dinámico (aquí irá el formulario) */}
      <div className="auth-layout-right">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;