import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "session_uid";

export async function GET(req: NextRequest) {
  try {
    const uid = req.cookies.get(COOKIE_NAME)?.value;
    if (!uid) {
      return NextResponse.json(null, { status: 200 });
    }
    const user = await prisma.user.findUnique({ where: { id: uid } });
    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id?: string };
    if (!id) {
      return NextResponse.json({ error: "id requis" }, { status: 400 });
    }
    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set(COOKIE_NAME, id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 jours
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true }, { status: 200 });
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
