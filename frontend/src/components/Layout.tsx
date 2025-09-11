// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; 

function Layout() {
  return (
    <div className="site-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer /> 
    </div>
  );
}

export default Layout;