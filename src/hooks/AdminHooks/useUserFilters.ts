import { useMemo, useState } from "react";
import type { AdminUser, UserStatusFilter } from "@/services/AdminServices/Types/adminUser";;

export function useUserFilters(users: AdminUser[]) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<UserStatusFilter>("ALL");

  const stats = useMemo(() => {
    const active = users.filter((u) => u.active).length;
    return { total: users.length, active, blocked: users.length - active };
  }, [users]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (status === "ACTIVE" && !u.active) return false;
      if (status === "BLOCKED" && u.active) return false;
      if (!q) return true;
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.stores.some((s) => s.storeName.toLowerCase().includes(q))
      );
    });
  }, [users, search, status]);

  return { search, setSearch, status, setStatus, stats, filtered };
}
