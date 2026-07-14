import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminRole } from "@/lib/auth";

export async function POST(request) {
  try {
    // Require admin authentication
    const admin = await requireAdminRole(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete all visitor data
    await prisma.uniqueVisitor.deleteMany();
    await prisma.visitStats.deleteMany();

    return NextResponse.json({
      success: true,
      message: "Data pengunjung berhasil di-reset",
    });
  } catch (error) {
    console.error("Visitor reset error:", error);
    return NextResponse.json({ error: "Failed to reset visitor data" }, { status: 500 });
  }
}
