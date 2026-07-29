import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const customers = await (prisma as any).customer.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(customers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch customers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, industry, arr, cloudSpend, cogsMargin, stripeStatus, contractRenewal, healthScore } = body;

    if (!name || !industry) {
      return NextResponse.json({ error: "Company name and industry are required" }, { status: 400 });
    }

    const customer = await (prisma as any).customer.create({
      data: {
        name,
        industry,
        arr: arr || "$100,000",
        cloudSpend: cloudSpend || "$15,000/mo",
        cogsMargin: cogsMargin || "75.0%",
        stripeStatus: stripeStatus || "Active",
        contractRenewal: contractRenewal || "2026-12-31",
        healthScore: healthScore ? Number(healthScore) : 85,
      },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create customer" }, { status: 500 });
  }
}
