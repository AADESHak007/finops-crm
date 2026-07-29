import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const existingLead = await prisma.lead.findUnique({ where: { id } });
    if (!existingLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const updatedStage = body.stage !== undefined ? Number(body.stage) : existingLead.stage;
    const stageScores: Record<number, number> = { 1: 20, 2: 50, 3: 80, 4: 95, 5: 100 };
    const sopScore = stageScores[updatedStage] || 20;

    const srcScore = existingLead.source === "website_form" ? 100 : existingLead.source === "meta_ads" ? 70 : 40;
    const conversionScore =
      0.25 * srcScore +
      0.3 * existingLead.engagementScore +
      0.25 * existingLead.budgetMatchScore +
      0.2 * sopScore;

    const score = Math.round(conversionScore);

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...body,
        stage: updatedStage,
        score,
        conversionScore,
      },
    });

    return NextResponse.json(lead);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.lead.delete({ where: { id } });
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete lead" }, { status: 500 });
  }
}
