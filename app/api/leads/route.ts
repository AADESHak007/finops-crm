import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: [{ stage: "asc" }, { score: "desc" }],
      include: {
        callLogs: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json(leads);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { company, contact, phone, email, arr, cloudSpend, tags, source, budgetMatchScore, engagementScore } = body;

    if (!company || !contact || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields: company, contact, email, phone" }, { status: 400 });
    }

    const srcScore = source === "website_form" ? 100 : source === "meta_ads" ? 70 : 40;
    const bgtScore = budgetMatchScore ?? 75;
    const engScore = engagementScore ?? 50;
    const sopScore = 20; // Default discovery stage score

    const conversionScore = 0.25 * srcScore + 0.3 * engScore + 0.25 * bgtScore + 0.2 * sopScore;
    const leadScore = Math.round(conversionScore);

    const lead = await prisma.lead.create({
      data: {
        company,
        contact,
        phone,
        email,
        arr: arr || "$50,000",
        score: leadScore,
        stage: 1,
        cloudSpend: cloudSpend || "$5.0k/mo AWS",
        tags: tags || ["Inbound"],
        source: source || "website_form",
        budgetMatchScore: bgtScore,
        engagementScore: engScore,
        conversionScore,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create lead" }, { status: 500 });
  }
}
