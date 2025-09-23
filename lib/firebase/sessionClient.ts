export async function setSessionCookie(uid: string): Promise<void> {
  await fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: uid }),
  });
}

export async function clearSessionCookie(): Promise<void> {
  await fetch("/api/session", { method: "DELETE" });
}
