import { useCallback, useEffect, useState } from "react";
import {
  assignUserStore,
  createUser,
  deleteUser,
  listUsers,
  resetUserPassword,
  setUserActive,
  updateUser,
} from "@/services/AdminServices/adminUserService";
import type {
  AdminUser,
  PasswordResetPayload,
  StoreAssignmentPayload,
  UserCreatePayload,
  UserUpdatePayload,
} from "@/services/AdminServices/Types/adminUser";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setUsers(await listUsers());
    } catch (e) {
      setError(getErrorMessage(e, "No se pudo cargar la lista de usuarios"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const replace = (u: AdminUser) => setUsers((prev) => prev.map((x) => (x.id === u.id ? u : x)));

  // Las mutaciones lanzan el error para que el formulario/modal lo muestre.
  const create = async (payload: UserCreatePayload) => {
    const created = await createUser(payload);
    setUsers((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id: string, payload: UserUpdatePayload) => {
    const updated = await updateUser(id, payload);
    replace(updated);
    return updated;
  };

  const resetPassword = (id: string, payload: PasswordResetPayload) => resetUserPassword(id, payload);

  const setActive = async (id: string, active: boolean) => {
    const updated = await setUserActive(id, active);
    replace(updated);
    return updated;
  };

  const remove = async (id: string) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((x) => x.id !== id));
  };

  const assignStore = async (id: string, payload: StoreAssignmentPayload) => {
    const updated = await assignUserStore(id, payload);
    replace(updated);
    return updated;
  };

  return { users, loading, error, reload, create, update, resetPassword, setActive, remove, assignStore };
}
