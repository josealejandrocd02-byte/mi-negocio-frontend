import { useEffect, useState } from "react";
import { listUsers } from "@/services/AdminServices/adminUserService";
import type { AdminUser } from "@/services/AdminServices/Types/adminUser";
import { inputClass } from "@/components/AdminComponents/users/Modal";

interface Props {
  value: string;
  onChange: (userId: string) => void;
  excludeIds?: string[];
}

/** Selector de usuarios activos (carga GET /admin/users una vez). */
export default function UserSelect({ value, onChange, excludeIds = [] }: Props) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listUsers().then(setUsers).catch(() => setUsers([])).finally(() => setLoading(false));
  }, []);

  const options = users.filter((u) => u.active && !excludeIds.includes(u.id));

  return (
    <select className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} disabled={loading}>
      <option value="">{loading ? "Cargando usuarios…" : "Selecciona un usuario"}</option>
      {options.map((u) => (
        <option key={u.id} value={u.id}>{u.fullName} — {u.email}</option>
      ))}
    </select>
  );
}
