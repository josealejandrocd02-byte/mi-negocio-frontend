import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  createEmployee, listEmployees, removeEmployee, resetEmployeePassword, setEmployeeActive, updateEmployee,
} from "@/services/StoreAdminServices/storeEmployeeService";
import type {
  EmployeeCreatePayload, EmployeeWithStore, PasswordResetPayload, StoreMember, StoreRef, UserUpdatePayload,
} from "@/services/StoreAdminServices/Types/storeEmployee";
import { getErrorMessage } from "@/utils/getErrorMessage";

/**
 * Empleados de TODAS las sucursales que administras.
 * El backend es por sucursal (/stores/{id}/employees), así que se consulta cada una en paralelo.
 */
export function useAllEmployees(stores: StoreRef[]) {
  const [employees, setEmployees] = useState<EmployeeWithStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // `stores` cambia de identidad en cada render: se recarga solo si cambian los ids
  const key = stores.map((s) => s.storeId).sort().join(",");
  const storesRef = useRef(stores);
  storesRef.current = stores;

  const reload = useCallback(async () => {
    const list = storesRef.current;
    if (list.length === 0) {
      setEmployees([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const results = await Promise.allSettled(list.map((s) => listEmployees(s.storeId)));

    const all: EmployeeWithStore[] = [];
    const failed: string[] = [];
    let lastError: unknown;
    results.forEach((r, i) => {
      const s = list[i];
      if (r.status === "fulfilled") {
        r.value.forEach((m) => all.push({ ...m, storeId: s.storeId, storeName: s.storeName }));
      } else {
        failed.push(s.storeName);
        lastError = r.reason;
      }
    });

    setEmployees(all);
    if (failed.length === list.length) setError(getErrorMessage(lastError, "No se pudieron cargar los empleados"));
    else if (failed.length > 0) setError(`No se pudo cargar el equipo de: ${failed.join(", ")}`);
    setLoading(false);
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    reload();
  }, [reload]);

  // Un mismo usuario puede trabajar en varias sucursales: el backend no deja que
  // un STORE_ADMIN edite su cuenta (solo el super admin). Sirve para deshabilitar acciones.
  const sharedUserIds = useMemo(() => {
    const count = new Map<string, number>();
    employees.forEach((e) => count.set(e.userId, (count.get(e.userId) ?? 0) + 1));
    return new Set([...count].filter(([, n]) => n > 1).map(([id]) => id));
  }, [employees]);

  const patch = (storeId: string, m: StoreMember) =>
    setEmployees((prev) =>
      prev.map((e) => (e.storeId === storeId && e.userId === m.userId ? { ...e, ...m } : e)),
    );

  // Las mutaciones lanzan el error para que el modal lo muestre.
  const create = async (storeId: string, payload: EmployeeCreatePayload) => {
    const m = await createEmployee(storeId, payload);
    const storeName = storesRef.current.find((s) => s.storeId === storeId)?.storeName ?? "";
    setEmployees((prev) => [{ ...m, storeId, storeName }, ...prev]);
    return m;
  };

  const update = async (storeId: string, userId: string, payload: UserUpdatePayload) => {
    const m = await updateEmployee(storeId, userId, payload);
    patch(storeId, m);
    return m;
  };

  const resetPassword = (storeId: string, userId: string, payload: PasswordResetPayload) =>
    resetEmployeePassword(storeId, userId, payload);

  const setActive = async (storeId: string, userId: string, active: boolean) => {
    const m = await setEmployeeActive(storeId, userId, active);
    patch(storeId, m);
    return m;
  };

  const remove = async (storeId: string, userId: string) => {
    await removeEmployee(storeId, userId);
    setEmployees((prev) => prev.filter((e) => !(e.storeId === storeId && e.userId === userId)));
  };

  return { employees, loading, error, reload, sharedUserIds, create, update, resetPassword, setActive, remove };
}
