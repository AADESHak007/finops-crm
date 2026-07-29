import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, outcome, durationSeconds, notes } = body;

    if (!leadId || !outcome || !notes) {
      return NextResponse.json({ error: "Missing required fields: leadId, outcome, notes" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Auto-advance stage if call was positive/connected and lead is at stage 1 or 2
    let nextStage = lead.stage;
    if (lead.stage <= 2 && (outcome.includes("Interested") || outcome.includes("Qualified") || outcome.includes("connected"))) {
      nextStage = Math.min(lead.stage + 1, 5);
    }

    const stageScores: Record<number, number> = { 1: 20, 2: 50, 3: 80, 4: 95, 5: 100 };
    const sopScore = stageScores[nextStage] || 20;
    const srcScore = lead.source === "website_form" ? 100 : lead.source === "meta_ads" ? 70 : 40;
    const conversionScore = 0.25 * srcScore + 0.3 * lead.engagementScore + 0.25 * lead.budgetMatchScore + 0.2 * sopScore;
    const score = Math.round(conversionScore);

    const [callLog, updatedLead] = await prisma.$transaction([
      prisma.callLog.create({
        data: {
          leadId,
          outcome,
          durationSeconds: durationSeconds || 0,
          notes,
        },
      }),
      prisma.lead.update({
        where: { id: leadId },
        data: {
          stage: nextStage,
          score,
          conversionScore,
        },
      }),
    ]);

    return NextResponse.json({ callLog, lead: updatedLead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to log call outcome" }, { status: 500 });
  }
}
