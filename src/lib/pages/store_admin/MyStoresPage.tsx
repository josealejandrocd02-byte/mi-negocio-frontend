import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Store as StoreIcon } from "lucide-react";
import { useMyStores } from "@/hooks/StoreAdimHooks/useMyStores";
import { btnPrimary } from "@/components/AdminComponents/users/Modal";

// A dónde lleva "Entrar" (cuando existan más módulos, apunta al inicio de la sucursal)
const storeHome = (storeId: string) => `/tienda/${storeId}/empleados`;

export default function MyStoresPage() {
  const navigate = useNavigate();
  const { me, adminStores, restrictedAdminStores, isLoading, isError, refetch } = useMyStores();

  return (
    <div className="px-8 py-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
        Mi negocio <span className="text-slate-400">/</span> Mis locales
      </p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-slate-900">
        {me ? `Hola, ${me.fullName.split(" ")[0]}` : "Mis locales"}
      </h1>
      <p className="mt-2 text-sm text-slate-500">Elige un local para administrar su equipo y su operación.</p>

      {isLoading && <p className="mt-8 text-sm text-slate-400">Cargando tus locales…</p>}

      {isError && (
        <div className="mt-6 flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          No se pudo consultar tus sucursales.
          <button className="font-semibold underline" onClick={() => refetch()}>Reintentar</button>
        </div>
      )}

      {!isLoading && !isError && adminStores.length === 0 && restrictedAdminStores.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <StoreIcon className="mx-auto text-slate-300" size={34} />
          <p className="mt-3 text-sm font-medium text-slate-700">No administras ningún local</p>
          <p className="mt-1 text-sm text-slate-400">
            Solo los administradores de una sucursal pueden gestionarla. Pide a un superadministrador que te vincule.
          </p>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminStores.map((s) => (
          <div key={s.storeId} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <StoreIcon size={22} />
            </div>
            <h2 className="mt-4 text-base font-bold text-slate-900">{s.storeName}</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                Administrador
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                Activo
              </span>
            </div>
            <button className={`${btnPrimary} mt-5 w-full`} onClick={() => navigate(storeHome(s.storeId))}>
              Entrar <ArrowRight size={16} />
            </button>
          </div>
        ))}

        {restrictedAdminStores.map((s) => (
          <div key={s.storeId} className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 opacity-80">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
              <Lock size={20} />
            </div>
            <h2 className="mt-4 text-base font-bold text-slate-700">{s.storeName}</h2>
            <span className="mt-2 w-fit rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
              Acceso restringido
            </span>
            <p className="mt-4 text-xs text-slate-400">Contacta al superadministrador para recuperar el acceso.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
