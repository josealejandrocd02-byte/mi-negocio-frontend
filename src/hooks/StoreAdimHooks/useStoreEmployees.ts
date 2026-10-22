import { useCallback, useEffect, useState } from "react";
import {
  createEmployee, listEmployees, removeEmployee, resetEmployeePassword, setEmployeeActive, updateEmployee,
} from "@/services/StoreAdminServices/storeEmployeeService";
import type {
  EmployeeCreatePayload, PasswordResetPayload, StoreMember, UserUpdatePayload,
} from "@/services/StoreAdminServices/Types/storeEmployee";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useStoreEmployees(storeId: string | undefined) {
  const [employees, setEmployees] = useState<StoreMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!storeId) return;
    setLoading(true);
    setError(null);
    try {
      setEmployees(await listEmployees(storeId));
    } catch (e) {
      setError(getErrorMessage(e, "No se pudo cargar el equipo"));
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const replace = (m: StoreMember) =>
    setEmployees((prev) => prev.map((x) => (x.userId === m.userId ? m : x)));

  // Las mutaciones lanzan el error para que el modal lo muestre.
  const create = async (payload: EmployeeCreatePayload) => {
    const created = await createEmployee(storeId!, payload);
    setEmployees((prev) => [created, ...prev]);
    return created;
  };

  const update = async (userId: string, payload: UserUpdatePayload) => {
    const updated = await updateEmployee(storeId!, userId, payload);
    replace(updated);
    return updated;
  };

  const resetPassword = (userId: string, payload: PasswordResetPayload) =>
    resetEmployeePassword(storeId!, userId, payload);

  const setActive = async (userId: string, active: boolean) => {
    const updated = await setEmployeeActive(storeId!, userId, active);
    replace(updated);
    return updated;
  };

  const remove = async (userId: string) => {
    await removeEmployee(storeId!, userId);
    setEmployees((prev) => prev.filter((x) => x.userId !== userId));
  };

  return { employees, loading, error, reload, create, update, resetPassword, setActive, remove };
}
