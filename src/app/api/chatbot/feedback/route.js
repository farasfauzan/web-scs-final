import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminRole } from "@/lib/auth";

function getClientIP(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

// GET /api/chatbot/feedback - list semua evaluasi (admin only)
export async function GET(request) {
  try {
    if (!(await requireAdminRole(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const evaluations = await prisma.chatbotEvaluation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ evaluations });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch evaluations" }, { status: 500 });
  }
}

// POST /api/chatbot/feedback - simpan evaluasi user (public)
export async function POST(request) {
  try {
    const data = await request.json();
    const ip = getClientIP(request);

    const evaluation = await prisma.chatbotEvaluation.create({
      data: {
        type: data.type || "negative_suggestion",
        detail: data.detail || "",
        ip,
      },
    });

    return NextResponse.json({ evaluation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}

// DELETE /api/chatbot/feedback?id=xxx - hapus per item
export async function DELETE(request) {
  try {
    if (!(await requireAdminRole(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const all = searchParams.get("all");

    if (all === "true") {
      // Hapus semua
      await prisma.chatbotEvaluation.deleteMany();
      return NextResponse.json({ success: true, message: "All evaluations deleted" });
    }

    if (id) {
      // Hapus per ID
      await prisma.chatbotEvaluation.delete({
        where: { id: Number(id) },
      });
      return NextResponse.json({ success: true, message: "Evaluation deleted" });
    }

    return NextResponse.json({ error: "Missing id or all parameter" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete evaluation" }, { status: 500 });
  }
}
