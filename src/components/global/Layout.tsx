// src/components/layout/Layout.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './Header';
import { useAuth } from '@/hooks/AuthHooks/useAuth'; // Tu hook existente

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onLogout = () => {
    handleLogout();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Sidebar - Oculto en móviles, visible en desktop */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar onLogout={onLogout} />
      </div>

      {/* Overlay para móviles */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Área Principal */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;