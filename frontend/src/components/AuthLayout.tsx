import React from 'react';
import logoImage from '../assets/logo.svg'; 
import './AuthLayout.css';

interface AuthLayoutProps {
  children: React.ReactNode; 
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout-container">
      <div className="auth-layout-left">
        <h1>Bienvenido a</h1>
        <img src={logoImage} alt="PseInt Web Studio Logo" className="auth-layout-logo" />
        <p>Tu plataforma interactiva para dominar la lógica de programación.</p>
      </div>

      <div className="auth-layout-right">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;