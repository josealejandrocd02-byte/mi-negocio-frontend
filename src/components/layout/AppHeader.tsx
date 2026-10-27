import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ClipboardList, LayoutDashboard, LogOut, Menu, Store, X } from "lucide-react";

import { useAuth } from "@/hooks/AuthHooks/useAuth";
import { getUser } from "@/utils/storage";

const PLATFORM_ROLES: Record<string, string> = {
  SUPER_ADMIN: "Superadministrador",
  USER: "Usuario",
};

export const AppHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const stored = getUser();

  const fullName = stored?.fullName ?? "Usuario";
  const email = stored?.email ?? "";
  const platformRole = stored?.platformRole ?? "USER";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const onLogout = () => {
    setMenuOpen(false);
    handleLogout();
    navigate("/", { replace: true });
  };

  const navItems = [
    {
      label: "Inicio / Mi Perfil",
      path: "/dashboard",
      icon: LayoutDashboard,
      description: "Datos de sesión y sucursales",
    },
    {
      label: "Órdenes",
      path: "/orders",
      icon: ClipboardList,
      description: "Pedidos e ítems de sucursal",
    },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {/* Barra superior fija */}
      <header className="sticky top-0 z-30 bg-[#1e1b4b] text-white shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          {/* Izquierda: Botón de menú hamburguesa (3 rayitas) + Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú de navegación"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2 text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#5b4bdf] transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5b4bdf]">
                <Store className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-wide">mi negocio</span>
            </Link>
          </div>

          {/* Centro (visible en escritorio): Accesos rápidos */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#5b4bdf] text-white shadow-sm"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Derecha: Usuario + Cerrar sesión */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 text-right">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5b4bdf] text-xs font-bold text-white">
                {initials || "U"}
              </div>
              <div className="leading-tight">
                <p className="text-xs font-semibold text-white truncate max-w-[140px]">{fullName}</p>
                <p className="text-[11px] text-gray-300">{PLATFORM_ROLES[platformRole] ?? platformRole}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs sm:text-sm hover:bg-white/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden xs:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer lateral (Menú de las 3 rayitas) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fondo oscuro */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          {/* Panel lateral izquierdo */}
          <aside className="relative z-10 flex w-72 max-w-[85vw] flex-col justify-between bg-[#1e1b4b] p-5 text-white shadow-2xl">
            <div>
              {/* Cabecera del menú */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5b4bdf]">
                    <Store className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-base font-bold tracking-wide block">mi negocio</span>
                    <span className="text-[11px] text-[#8b85c1] block">Panel de gestión</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="rounded-lg p-1.5 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Tarjeta del usuario en el menú */}
              <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5b4bdf] text-sm font-bold text-white">
                    {initials || "U"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{fullName}</p>
                    <p className="truncate text-xs text-gray-300">{email}</p>
                    <span className="mt-1 inline-block rounded-full bg-[#5b4bdf]/30 px-2 py-0.5 text-[10px] font-medium text-indigo-200">
                      {PLATFORM_ROLES[platformRole] ?? platformRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* Opciones de navegación */}
              <div className="mt-6">
                <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[#8b85c1] mb-2">
                  Navegación
                </p>
                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition-colors ${
                          active
                            ? "bg-[#5b4bdf] text-white font-semibold shadow-sm"
                            : "text-gray-200 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        <div>
                          <p className="leading-none">{item.label}</p>
                          <p className="mt-1 text-[11px] text-gray-300/80 font-normal">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Pie del menú: Cerrar sesión */}
            <div className="border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-500/20 hover:border-red-400/40 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default AppHeader;