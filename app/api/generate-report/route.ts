import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { auditId } = await request.json();
  if (!auditId) return NextResponse.json({ error: "auditId is required" }, { status: 400 });
  const supabase = createSupabaseServerClient();
  const { data: audit, error } = await supabase.from("audits").select("*, value_scores(*), offers(*)").eq("id", auditId).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  const report = {
    auditId,
    executiveSummary: "This report translates the intake into offer value, bottleneck, pricing, and implementation priorities.",
    sections: ["Value Equation", "Bottleneck Diagnosis", "Offer Stack", "Pricing Architecture", "Implementation Roadmap"],
    audit
  };
  await supabase.from("reports").insert({ audit_id: auditId, title: "Offer Engineering Growth Report", report_payload: report, status: "Published" });
  return NextResponse.json(report);
}
