import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { evaluateValueEquation } from "@/lib/engines/value-equation";
import { identifyProblems } from "@/lib/engines/diagnostic";
import { generateOffer } from "@/lib/engines/offer-generator";

const intakeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  businessName: z.string().min(2),
  industry: z.string().min(2),
  monthlyRevenue: z.string().min(1),
  currentOffer: z.string().min(10),
  pricingStructure: z.string().min(3),
  leadGenerationMethod: z.string().min(3),
  biggestBottleneck: z.string().min(3),
  goals: z.string().min(5),
  clientAcquisitionProcess: z.string().min(5),
  fulfillmentMethod: z.string().min(5),
  biggestOperationalIssue: z.string().min(3)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const supabase = createSupabaseServerClient();
  const valueScore = evaluateValueEquation(parsed.data);
  const diagnostic = identifyProblems(parsed.data);
  const offer = generateOffer(parsed.data);

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .insert({
      name: parsed.data.name,
      email: parsed.data.email,
      business_name: parsed.data.businessName,
      industry: parsed.data.industry,
      monthly_revenue: parsed.data.monthlyRevenue,
      status: "New Lead",
      intake_payload: parsed.data
    })
    .select("id")
    .single();

  if (leadError) return NextResponse.json({ error: leadError.message }, { status: 500 });

  const { data: audit, error: auditError } = await supabase
    .from("audits")
    .insert({ lead_id: lead.id, title: `${parsed.data.businessName} Growth Audit`, status: "Audit Complete", diagnostic_report: diagnostic, recommendations: offer })
    .select("id")
    .single();

  if (auditError) return NextResponse.json({ error: auditError.message }, { status: 500 });

  await supabase.from("value_scores").insert({ audit_id: audit.id, ...snakeValueScore(valueScore) });
  await supabase.from("offers").insert({ audit_id: audit.id, name: offer.name, positioning: offer.positioning, offer_payload: offer });
  await supabase.from("activity_logs").insert({ lead_id: lead.id, event_type: "intake_submitted", message: "Prospect submitted growth audit intake." });

  return NextResponse.json({ leadId: lead.id, auditId: audit.id, valueScore, diagnostic, offer });
}

function snakeValueScore(score: ReturnType<typeof evaluateValueEquation>) {
  return {
    overall_score: score.overall,
    dream_outcome_score: score.dreamOutcome,
    perceived_likelihood_score: score.perceivedLikelihood,
    time_delay_score: score.timeDelay,
    effort_sacrifice_score: score.effortSacrifice,
    weaknesses: score.weaknesses,
    recommendations: score.recommendations,
    pricing_power: score.pricingPower
  };
}
