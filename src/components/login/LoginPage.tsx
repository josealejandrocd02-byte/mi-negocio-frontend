import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "@/hooks/AuthHooks/useAuth";
import { isAuthenticated } from "@/utils/isTokenValid";
import { getRole } from "@/utils/storage";

// Convierte cualquier error en un mensaje entendible para el usuario
const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      return "No se pudo conectar con el servidor. Revisa que el backend esté encendido.";
    }

    const data = err.response.data as
      | { message?: string; errors?: Record<string, string> }
      | undefined;

    // Errores de validación (400): muestra el primero
    if (data?.errors) {
      const first = Object.values(data.errors)[0];
      if (first) return first;
    }

    if (err.response.status === 401) return "Correo o contraseña incorrectos.";
    if (data?.message) return data.message;
  }
  return "Ocurrió un error inesperado. Intenta de nuevo.";
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const role = getRole();

  // Si ya tiene una sesión válida, no vuelve a ver el login
  if (isAuthenticated()) {
    if (role === "SUPER_ADMIN") {
      navigate("/dashboard_super_admin", { replace: true });
    } else if (role === "USER") {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
      }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      await handleLogin(email.trim(), password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans">
      {/* ================= COLUMNA IZQUIERDA (AZUL OSCURO) ================= */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1e1b4b] relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* Círculos decorativos de fondo */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full border border-white/5 opacity-50 pointer-events-none"></div>
        <div className="absolute top-[10%] right-[5%] w-[800px] h-[800px] rounded-full border border-white/5 opacity-30 pointer-events-none"></div>

        {/* Logo Superior */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-[#5b4bdf] p-2 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-wide">mi negocio</span>
        </div>

        {/* Contenido Central */}
        <div className="relative z-10 max-w-lg mt-20">
          <p className="text-xs font-semibold tracking-widest text-[#8b85c1] uppercase mb-4">
            Tu negocio, en orden
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6">
            Cada día más claro. Cada venta más simple.
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-12">
            Una sola herramienta para cuidar tus productos, ventas y equipo. Hecha para el ritmo real de tu local.
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Acceso seguro a tu espacio de trabajo
          </div>
        </div>

        {/* Footer Inferior */}
        <div className="relative z-10 flex items-center gap-2 text-sm text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Diseñado para comercios bolivianos
        </div>
      </div>

      {/* ================= COLUMNA DERECHA (FORMULARIO CLARO) ================= */}
      <div className="w-full lg:w-1/2 bg-[#f8f9fc] flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Encabezado */}
          <div className="mb-8">
            <p className="text-[#5b4bdf] text-sm font-semibold mb-2">Bienvenido de nuevo</p>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">Inicia sesión</h2>
            <p className="text-gray-500 text-sm">Ingresa a tu espacio de trabajo.</p>
          </div>

          {/* Formulario */}
          <form className="space-y-5" onSubmit={onSubmit} noValidate>
            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Input Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5b4bdf] focus:border-transparent bg-white shadow-sm text-gray-900"
              />
            </div>

            {/* Input Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 pr-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5b4bdf] focus:border-transparent bg-white shadow-sm text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={loading || !email.trim() || !password}
              className="w-full bg-[#5b4bdf] hover:bg-[#4a3bc7] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Ingresando...
                </>
              ) : (
                <>
                  Entrar
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Caja de Información */}
          <div className="mt-8 bg-[#f0f2fa] border border-[#e0e4f5] rounded-xl p-4 text-xs text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-800">¿No tienes acceso?</span> Las cuentas las crea el
            administrador de la plataforma. Solicita tu acceso y recibirás tu correo y contraseña.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
