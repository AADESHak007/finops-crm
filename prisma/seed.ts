import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialLeads = [
  {
    company: "Apex Financial",
    contact: "Sarah Jenkins (CFO)",
    phone: "+1 (555) 234-5678",
    email: "sarah@apex.io",
    arr: "$120,000",
    score: 94,
    stage: 1,
    cloudSpend: "$12.4k/mo AWS",
    tags: ["High Margin", "Enterprise"],
    source: "website_form",
    budgetMatchScore: 100,
    engagementScore: 90,
    conversionScore: 94.0,
  },
  {
    company: "DataPulse AI",
    contact: "Marcus Vance (VP Eng)",
    phone: "+1 (555) 345-6789",
    email: "marcus@datapulse.ai",
    arr: "$48,000",
    score: 78,
    stage: 1,
    cloudSpend: "$4.1k/mo GCP",
    tags: ["Growth"],
    source: "meta_ads",
    budgetMatchScore: 40,
    engagementScore: 70,
    conversionScore: 78.0,
  },
  {
    company: "CloudScale Logic",
    contact: "David Wu (FinOps Lead)",
    phone: "+1 (555) 876-5432",
    email: "david@cloudscale.io",
    arr: "$85,000",
    score: 88,
    stage: 2,
    cloudSpend: "$18.9k/mo Multi-cloud",
    tags: ["FinOps Optimization"],
    source: "website_form",
    budgetMatchScore: 75,
    engagementScore: 80,
    conversionScore: 88.0,
  },
  {
    company: "Nova Pay Tech",
    contact: "Elena Rostova (CTO)",
    phone: "+1 (555) 901-2345",
    email: "elena@novapay.com",
    arr: "$64,000",
    score: 82,
    stage: 3,
    cloudSpend: "$8.2k/mo AWS",
    tags: ["Fintech"],
    source: "website_form",
    budgetMatchScore: 75,
    engagementScore: 85,
    conversionScore: 82.0,
  },
  {
    company: "Vanguard Quant Labs",
    contact: "Arthur Pendelton (MD)",
    phone: "+1 (555) 678-9012",
    email: "arthur@vanguard.io",
    arr: "$210,000",
    score: 96,
    stage: 4,
    cloudSpend: "$42.0k/mo AWS",
    tags: ["Enterprise VIP"],
    source: "website_form",
    budgetMatchScore: 100,
    engagementScore: 95,
    conversionScore: 96.0,
  },
  {
    company: "Hyperion Defense",
    contact: "Dr. Karen Lee",
    phone: "+1 (555) 432-1098",
    email: "karen@hyperion.def",
    arr: "$150,000",
    score: 91,
    stage: 5,
    cloudSpend: "$28.0k/mo GovCloud",
    tags: ["Security"],
    source: "website_form",
    budgetMatchScore: 100,
    engagementScore: 85,
    conversionScore: 91.0,
  },
];

async function main() {
  console.log("Seeding initial CRM leads into Aiven MySQL...");
  for (const leadData of initialLeads) {
    await prisma.lead.upsert({
      where: { email: leadData.email },
      update: leadData,
      create: leadData,
    });
  }

  const initialCustomers = [
    { name: "Acme Cloud Infrastructure", industry: "SaaS Platform", arr: "$240,000", cogsMargin: "78.4%", stripeStatus: "Active", cloudSpend: "$34,200/mo", contractRenewal: "2026-11-15", healthScore: 92 },
    { name: "FinTech Global Operations", industry: "Banking & Finance", arr: "$510,000", cogsMargin: "82.1%", stripeStatus: "Active", cloudSpend: "$88,000/mo", contractRenewal: "2026-09-01", healthScore: 98 },
    { name: "Quantum Analytics Lab", industry: "AI & Machine Learning", arr: "$125,000", cogsMargin: "61.2%", stripeStatus: "Past Due", cloudSpend: "$29,500/mo", contractRenewal: "2026-08-10", healthScore: 64 },
    { name: "BioGen Research", industry: "Healthcare & Life Sciences", arr: "$98,000", cogsMargin: "74.0%", stripeStatus: "Active", cloudSpend: "$12,800/mo", contractRenewal: "2027-01-20", healthScore: 88 },
    { name: "LogiStream Supply Chain", industry: "Logistics Enterprise", arr: "$180,000", cogsMargin: "71.5%", stripeStatus: "Active", cloudSpend: "$22,400/mo", contractRenewal: "2026-10-30", healthScore: 85 },
  ];

  console.log("Seeding initial customers...");
  for (const cust of initialCustomers) {
    const existing = await prisma.customer.findFirst({ where: { name: cust.name } });
    if (!existing) {
      await prisma.customer.create({ data: cust });
    }
  }
  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
