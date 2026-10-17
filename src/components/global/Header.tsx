// src/components/layout/Header.tsx
import React from 'react';
import { RefreshCw, ChevronDown, Menu } from 'lucide-react';
import { useUserSession } from '@/hooks/useUserSession ';

interface HeaderProps {
  toggleSidebar?: () => void; // Para móviles
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { isSuperAdmin, isStoreAdmin, isEmployee, user } = useUserSession();

  // Lógica para títulos dinámicos
  const getTitle = () => {
    if (isSuperAdmin) return "Todos tus negocios";
    if (isStoreAdmin) return user?.stores?.[0]?.storeName ?? "Mi Local";
    return "Punto de Venta";
  };

  const getSubtitle = () => {
    if (isSuperAdmin) return "Panel de Administración";
    if (isStoreAdmin) return "Panel de Sucursal";
    return "Terminal de Empleado";
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Botón menú para móviles */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={20} />
        </button>

        <div>
          <p className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase mb-0.5">
            {getSubtitle()}
          </p>
          <h2 className="text-xl font-bold text-gray-800">
            {getTitle()}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        
        {/* Badge Demo (Solo SuperAdmin) */}
        {isSuperAdmin && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#eef2ff] rounded-md border border-[#e0e7ff]">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-medium text-[#4f46e5]">Demo global</span>
          </div>
        )}

        {/* Selector de Vista (Solo SuperAdmin) */}
        {isSuperAdmin ? (
          <div className="relative hidden sm:block">
            <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#6366f1] cursor-pointer font-medium">
              <option>Vista: Superadmin</option>
              <option>Vista: Admin Local</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        ) : (
          /* Mostrar nombre de la tienda si no es superadmin */
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
            <span className="font-medium">Sucursal:</span>
            <span>{user?.stores?.[0]?.storeName ?? "Sin asignar"}</span>
          </div>
        )}

        {/* Botón Refrescar */}
        <button className="p-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">
          <RefreshCw size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;