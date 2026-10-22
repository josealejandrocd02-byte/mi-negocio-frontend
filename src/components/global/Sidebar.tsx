// src/components/layout/Sidebar.tsx
import React from 'react';
import {
  Briefcase, LayoutDashboard, Store, Users,
  LogOut, ShieldCheck, ShoppingBag, Package,
  PizzaIcon,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useUserSession } from '@/hooks/useUserSession ';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const { isSuperAdmin, isStoreAdmin, fullName, initials } = useUserSession();

  // --- Definición de Menús por Rol ---
  const superAdminMenu = [
    { name: 'Resumen global', icon: LayoutDashboard, path: '/dashboard_super_admin' },
    { name: 'Locales', icon: Store, path: '/locales' },
    { name: 'Usuarios', icon: Users, path: '/usuarios' },
  ];

  const storeAdminMenu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Mi Negocio', icon: Store, path: '/mi-local' },
    { name: 'Empleados', icon: Users, path: '/empleados' },
    { name: 'Productos', icon: PizzaIcon, path: '/productos' },
    { name: 'Categorias', icon: Package, path: '/categorias' },
    { name: 'Ventas', icon: ShoppingBag, path: '/ventas' },
  ];

  const employeeMenu = [
    { name: 'Nueva Orden', icon: ShoppingBag, path: '/pos' },
    { name: 'Mis Ordenes', icon: LayoutDashboard, path: '/mis-ventas' },

  ];

  const menuItems = isSuperAdmin ? superAdminMenu : isStoreAdmin ? storeAdminMenu : employeeMenu;
  const roleLabel = isSuperAdmin ? 'Superadmin' : isStoreAdmin ? 'Admin Local' : 'Empleado';

  return (
    <aside className="w-64 h-screen bg-[#1e1b4b] text-white flex flex-col justify-between font-sans border-r border-[#2e2a5e]">
      <div>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#6366f1] p-2 rounded-lg">
            <Briefcase size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">mi negocio</h1>
            <p className="text-[10px] text-gray-400 tracking-wider">CENTRO DE CONTROL</p>
          </div>
        </div>

        {/* Menú Dinámico */}
        <nav className="px-4 mt-4 space-y-1">
          {isSuperAdmin && (
            <div className="mb-6">
              <div className="flex items-center gap-3 px-3 py-2 bg-[#2e2a5e] rounded-lg">
                <ShieldCheck size={20} className="text-gray-300" />
                <div>
                  <p className="text-sm font-medium">Administración</p>
                  <p className="text-[11px] text-gray-400">Todos los locales</p>
                </div>
              </div>
            </div>
          )}

          <p className="px-3 text-[11px] font-semibold text-gray-400 tracking-wider mb-2">
            PLATAFORMA
          </p>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#6366f1] text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-[#2e2a5e]'
                }`
              }
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Perfil de Usuario */}
      <div className="p-4 border-t border-[#2e2a5e]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
            <div>
              <p className="text-sm font-medium truncate max-w-[100px]">{fullName}</p>
              <p className="text-[11px] text-gray-400">{roleLabel}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-white transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
