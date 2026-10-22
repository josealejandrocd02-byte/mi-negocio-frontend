<<<<<<< HEAD
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/AuthHooks/useAuth";
import { getMe } from "@/services/AuthServices/authService";
import { getUser } from "@/utils/storage";
import { getTokenExpiration } from '@/utils/isTokenValid';


const PLATFORM_ROLES: Record<string, string> = {
  SUPER_ADMIN: "Superadministrador",
  USER: "Usuario",
};

const STORE_ROLES: Record<string, string> = {
  STORE_ADMIN: "Administrador de sucursal",
  EMPLOYEE: "Empleado",
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</dt>
    <dd className="mt-1 break-all text-sm text-gray-900">{value}</dd>
  </div>
);

// Página de prueba: muestra la información del usuario con sesión iniciada
const TestPage = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const stored = getUser(); // datos guardados al iniciar sesión
  const expiresAt = getTokenExpiration();

  // Datos frescos desde el backend (GET /api/me). Si falla, se usan los guardados.
  const { data: me, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  const fullName = me?.fullName ?? stored?.fullName ?? "Usuario";
  const email = me?.email ?? stored?.email ?? "-";
  const platformRole = me?.platformRole ?? stored?.platformRole ?? "-";
  const userId = me?.id ?? stored?.userId ?? "-";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const onLogout = () => {
    handleLogout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans">
      {/* Barra superior */}
      <header className="bg-[#1e1b4b] text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-wide">mi negocio</span>
          <button
            onClick={onLogout}
            className="rounded-lg border border-white/20 px-4 py-1.5 text-sm hover:bg-white/10 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-6 py-10">
        {/* Estado de la sesión */}
        <div className="flex items-center gap-3">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Sesión iniciada correctamente</h1>
        </div>

        {/* Tarjeta de usuario */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5b4bdf] text-lg font-bold text-white">
              {initials || "?"}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{fullName}</p>
              <span className="mt-1 inline-block rounded-full bg-[#f0f2fa] px-3 py-0.5 text-xs font-medium text-[#5b4bdf]">
                {PLATFORM_ROLES[platformRole] ?? platformRole}
              </span>
            </div>
          </div>

          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Correo" value={email} />
            <Field label="Rol de plataforma" value={platformRole} />
            <Field label="ID de usuario" value={userId} />
            <Field
              label="Cuenta creada"
              value={me?.createdAt ? new Date(me.createdAt).toLocaleString("es-BO") : "-"}
            />
            <Field label="Estado de la cuenta" value={me ? (me.active ? "Activa" : "Bloqueada") : "-"} />
            <Field label="La sesión expira" value={expiresAt ? expiresAt.toLocaleString("es-BO") : "-"} />
          </dl>
        </section>

        {/* Sucursales */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Mis sucursales</h2>

          {isLoading && <p className="text-sm text-gray-500">Cargando...</p>}

          {isError && (
            <p className="text-sm text-amber-700">
              No se pudo consultar <code>/api/me</code>. Se muestran los datos guardados al iniciar sesión.
            </p>
          )}

          {me && me.stores.length === 0 && (
            <p className="text-sm text-gray-500">
              {me.platformRole === "SUPER_ADMIN"
                ? "El superadministrador gestiona la plataforma y no pertenece a una sucursal."
                : "Todavía no estás vinculado a ninguna sucursal."}
            </p>
          )}

          {me && me.stores.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-400">
                    <th className="py-2 pr-4 font-medium">Sucursal</th>
                    <th className="py-2 pr-4 font-medium">Rol</th>
                    <th className="py-2 font-medium">Acceso</th>
                  </tr>
                </thead>
                <tbody>
                  {me.stores.map((s) => (
                    <tr key={s.storeId} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 pr-4 font-medium text-gray-900">{s.storeName}</td>
                      <td className="py-3 pr-4 text-gray-600">{STORE_ROLES[s.role] ?? s.role}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            s.active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                          }`}
                        >
                          {s.active ? "Activo" : "Restringido"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Respuesta cruda, útil para depurar */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Datos recibidos del backend</h2>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-green-300">
            {JSON.stringify(me ?? stored, null, 2)}
          </pre>
        </section>
      </main>
    </div>
  );
};

export default TestPage;
=======
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/AuthHooks/useAuth";
import { getMe } from "@/services/AuthServices/authService";
import { getUser } from "@/utils/storage";
import { getTokenExpiration } from '@/utils/isTokenValid';


const PLATFORM_ROLES: Record<string, string> = {
  SUPER_ADMIN: "Superadministrador",
  USER: "Usuario",
};

const STORE_ROLES: Record<string, string> = {
  STORE_ADMIN: "Administrador de sucursal",
  EMPLOYEE: "Empleado",
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</dt>
    <dd className="mt-1 break-all text-sm text-gray-900">{value}</dd>
  </div>
);

// Página de prueba: muestra la información del usuario con sesión iniciada
const TestPage = () => {
  const navigate = useNavigate();

  const stored = getUser(); // datos guardados al iniciar sesión
  const expiresAt = getTokenExpiration();

  // Datos frescos desde el backend (GET /api/me). Si falla, se usan los guardados.
  const { data: me, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  const fullName = me?.fullName ?? stored?.fullName ?? "Usuario";
  const email = me?.email ?? stored?.email ?? "-";
  const platformRole = me?.platformRole ?? stored?.platformRole ?? "-";
  const userId = me?.id ?? stored?.userId ?? "-";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();


  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans">


      <main className="mx-auto max-w-4xl space-y-6 px-6 py-10">
        {/* Estado de la sesión */}
        <div className="flex items-center gap-3">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Sesión iniciada correctamente NO Adminaa</h1>
        </div>

        {/* Tarjeta de usuario */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5b4bdf] text-lg font-bold text-white">
              {initials || "?"}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{fullName}</p>
              <span className="mt-1 inline-block rounded-full bg-[#f0f2fa] px-3 py-0.5 text-xs font-medium text-[#5b4bdf]">
                {PLATFORM_ROLES[platformRole] ?? platformRole}
              </span>
            </div>
          </div>

          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Correo" value={email} />
            <Field label="Rol de plataforma" value={platformRole} />
            <Field label="ID de usuario" value={userId} />
            <Field
              label="Cuenta creada"
              value={me?.createdAt ? new Date(me.createdAt).toLocaleString("es-BO") : "-"}
            />
            <Field label="Estado de la cuenta" value={me ? (me.active ? "Activa" : "Bloqueada") : "-"} />
            <Field label="La sesión expira" value={expiresAt ? expiresAt.toLocaleString("es-BO") : "-"} />
          </dl>
        </section>

        {/* Sucursales */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Mis sucursales</h2>

          {isLoading && <p className="text-sm text-gray-500">Cargando...</p>}

          {isError && (
            <p className="text-sm text-amber-700">
              No se pudo consultar <code>/api/me</code>. Se muestran los datos guardados al iniciar sesión.
            </p>
          )}

          {me && me.stores.length === 0 && (
            <p className="text-sm text-gray-500">
              {me.platformRole === "SUPER_ADMIN"
                ? "El superadministrador gestiona la plataforma y no pertenece a una sucursal."
                : "Todavía no estás vinculado a ninguna sucursal."}
            </p>
          )}

          {me && me.stores.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-400">
                    <th className="py-2 pr-4 font-medium">Sucursal</th>
                    <th className="py-2 pr-4 font-medium">Rol</th>
                    <th className="py-2 font-medium">Acceso</th>
                  </tr>
                </thead>
                <tbody>
                  {me.stores.map((s) => (
                    <tr key={s.storeId} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 pr-4 font-medium text-gray-900">{s.storeName}</td>
                      <td className="py-3 pr-4 text-gray-600">{STORE_ROLES[s.role] ?? s.role}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            s.active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                          }`}
                        >
                          {s.active ? "Activo" : "Restringido"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Respuesta cruda, útil para depurar */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Datos recibidos del backend</h2>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-green-300">
            {JSON.stringify(me ?? stored, null, 2)}
          </pre>
        </section>
      </main>
    </div>
  );
};

export default TestPage;
>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
