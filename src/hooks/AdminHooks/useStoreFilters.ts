import { useMemo, useState } from "react";
import type { Store, StoreStatusFilter } from "@/services/AdminServices/Types/adminStore";

export function useStoreFilters(stores: Store[]) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StoreStatusFilter>("ALL");

  const stats = useMemo(
    () => ({
      total: stores.length,
      active: stores.filter((s) => s.status === "ACTIVE").length,
      suspended: stores.filter((s) => s.status === "SUSPENDED").length,
      closed: stores.filter((s) => s.status === "CLOSED").length,
    }),
    [stores],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return stores.filter((s) => {
      if (status !== "ALL" && s.status !== status) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.ownerName.toLowerCase().includes(q) ||
        s.ownerEmail.toLowerCase().includes(q)
      );
    });
  }, [stores, search, status]);

  return { search, setSearch, status, setStatus, stats, filtered };
}
