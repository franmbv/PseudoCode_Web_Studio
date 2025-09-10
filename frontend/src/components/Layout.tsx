// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.tsx';

function Layout() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      {/* Aquí podríamos añadir un Footer en el futuro */}
    </>
  );
}

export default Layout;