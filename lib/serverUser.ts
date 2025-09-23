export type ServerUser = {
  id: string;
  phoneNumber: string;
  displayName?: string | null;
  createdAt?: string;
  updatedAt?: string;
} | null;

export async function fetchUserByPhone(phone: string): Promise<ServerUser> {
  const res = await fetch(
    `/api/users/by-phone?phone=${encodeURIComponent(phone)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Échec récupération utilisateur par téléphone");
  const data = (await res.json()) as ServerUser;
  return data;
}

export async function upsertUserServer(input: {
  id: string;
  phoneNumber: string;
  displayName?: string | null;
}): Promise<NonNullable<ServerUser>> {
  const res = await fetch(`/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Échec upsert utilisateur serveur");
  return (await res.json()) as NonNullable<ServerUser>;
}

