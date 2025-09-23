import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const car = await prisma.car.findUnique({ where: { id } });
    if (!car) {
      return new Response(JSON.stringify({ error: "Car non trouvée" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(car), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const uid = req.cookies.get("session_uid")?.value;
    if (!uid) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const car = await prisma.car.findUnique({ where: { id } });
    if (!car || car.sellerId !== uid) {
      return new Response(JSON.stringify({ error: "Accès refusé" }), {
        status: 403,
      });
    }

    const allowed = [
      "title",
      "description",
      "brand",
      "model",
      "year",
      "mileage",
      "price",
      "location",
      "whatsappNumber",
      "fuel",
      "transmission",
      "bodyType",
      "condition",
      "images",
      "status",
    ];
    const data: Record<string, unknown> = {};
    for (const k of allowed) {
      if (k in body) data[k] = body[k];
    }

    const updated = await prisma.car.update({ where: { id }, data });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const uid = req.cookies.get("session_uid")?.value;
    if (!uid) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
      });
    }
    const car = await prisma.car.findUnique({ where: { id } });
    if (!car || car.sellerId !== uid) {
      return new Response(JSON.stringify({ error: "Accès refusé" }), {
        status: 403,
      });
    }
    await prisma.car.delete({ where: { id } });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const uid = req.cookies.get("session_uid")?.value;
    if (!uid) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
      });
    }

    const existing = await prisma.car.findUnique({ where: { id } });
    if (!existing || existing.sellerId !== uid) {
      return new Response(JSON.stringify({ error: "Accès refusé" }), {
        status: 403,
      });
    }

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const data: any = {};
      const fields = [
        "title",
        "description",
        "brand",
        "model",
        "year",
        "mileage",
        "price",
        "location",
        "whatsappNumber",
      ];
      for (const f of fields) {
        const v = formData.get(f);
        if (v !== null)
          data[f] = ["year", "mileage", "price"].includes(f)
            ? Number(v)
            : String(v);
      }
      // Pas de re-upload images ici pour simplicité (peut être ajouté comme dans POST)
      const updated = await prisma.car.update({ where: { id }, data });
      return new Response(JSON.stringify(updated), { status: 200 });
    } else {
      const body = await req.json();
      const allowed = [
        "title",
        "description",
        "brand",
        "model",
        "year",
        "mileage",
        "price",
        "location",
        "whatsappNumber",
        "fuel",
        "transmission",
        "bodyType",
        "condition",
        "images",
      ];
      const data: any = {};
      for (const k of allowed) if (k in body) data[k] = body[k];
      const updated = await prisma.car.update({ where: { id }, data });
      return new Response(JSON.stringify(updated), { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
