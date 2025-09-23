"use client";

import { useEffect, useState } from "react";

export type SessionUser = {
  id: string;
  phoneNumber: string;
  displayName?: string | null;
  createdAt: string;
  updatedAt: string;
} | null;

export function useSessionUser() {
  const [user, setUser] = useState<SessionUser>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const res = await fetch("/api/session", { cache: "no-store" });
      if (!res.ok) throw new Error("Échec récupération session");
      const data = (await res.json()) as SessionUser;
      setUser(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur session");
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      await refresh();
      if (mounted) setLoading(false);
    })();
    const onUpdate = () => refresh();
    window.addEventListener("session:updated", onUpdate);
    return () => {
      mounted = false;
      window.removeEventListener("session:updated", onUpdate);
    };
  }, []);

  return { user, loading, error, refresh } as const;
}
