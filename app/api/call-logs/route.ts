import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const callLogs = await prisma.callLog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        lead: true,
      },
    });

    return NextResponse.json(callLogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch call logs" }, { status: 500 });
  }
}
