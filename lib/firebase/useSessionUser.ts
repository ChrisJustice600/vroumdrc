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

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/session", { cache: "no-store" });
        if (!res.ok) throw new Error("Échec récupération session");
        const data = (await res.json()) as SessionUser;
        if (mounted) setUser(data);
      } catch (e) {
        if (mounted)
          setError(e instanceof Error ? e.message : "Erreur session");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading, error } as const;
}
