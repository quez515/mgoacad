"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { IntakeSubmission } from "@/lib/types";

type Field = { key: keyof IntakeSubmission; label: string; type?: "input" | "textarea"; placeholder: string };
const steps: { title: string; description: string; fields: Field[] }[] = [
  { title: "Business identity", description: "Who are we diagnosing?", fields: [
    { key: "name", label: "Your name", placeholder: "Alex Founder" }, { key: "email", label: "Email", placeholder: "alex@company.com" }, { key: "businessName", label: "Business name", placeholder: "Premium Growth Studio" }, { key: "industry", label: "Industry", placeholder: "B2B marketing agency" }
  ]},
  { title: "Current monetization", description: "Show us the current offer and revenue model.", fields: [
    { key: "monthlyRevenue", label: "Monthly revenue", placeholder: "$12,000/month" }, { key: "currentOffer", label: "Current offer", type: "textarea", placeholder: "Describe what you sell, to whom, and what outcome it creates." }, { key: "pricingStructure", label: "Pricing structure", type: "textarea", placeholder: "Packages, retainers, hourly, one-time, tiers, discounts..." }
  ]},
  { title: "Acquisition & bottlenecks", description: "Where growth is currently constrained.", fields: [
    { key: "leadGenerationMethod", label: "Lead generation method", type: "textarea", placeholder: "Referrals, content, outbound, paid ads, partnerships..." }, { key: "biggestBottleneck", label: "Biggest bottleneck", type: "textarea", placeholder: "What is preventing the next revenue level?" }, { key: "goals", label: "Goals", type: "textarea", placeholder: "What outcome do you want in the next 90 days? Include numbers if possible." }
  ]},
  { title: "Delivery system", description: "Map sales-to-fulfillment friction.", fields: [
    { key: "clientAcquisitionProcess", label: "Client acquisition process", type: "textarea", placeholder: "Describe discovery calls, proposals, follow-up, onboarding..." }, { key: "fulfillmentMethod", label: "Fulfillment method", type: "textarea", placeholder: "How do you deliver the result today?" }, { key: "biggestOperationalIssue", label: "Biggest operational issue", type: "textarea", placeholder: "Capacity, quality control, speed, hiring, tools, client compliance..." }
  ]}
];
const initial = Object.fromEntries(steps.flatMap((s) => s.fields.map((f) => [f.key, ""]))) as unknown as IntakeSubmission;

export function IntakeForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<IntakeSubmission>(initial);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);
  const current = steps[step];
  async function submit() {
    setLoading(true);
    const response = await fetch("/api/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  }
  if (result) return <AuditResult result={result} />;
  return (
    <Card>
      <CardHeader>
        <CardDescription>Step {step + 1} of {steps.length} • {progress}% complete</CardDescription>
        <div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div>
        <CardTitle>{current.title}</CardTitle><CardDescription>{current.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {current.fields.map((field) => <label key={field.key} className="block space-y-2"><span className="text-sm font-medium">{field.label}</span>{field.type === "textarea" ? <Textarea value={form[field.key]} placeholder={field.placeholder} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} /> : <Input value={form[field.key]} placeholder={field.placeholder} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} />}</label>)}
        <div className="flex justify-between pt-4"><Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>{step === steps.length - 1 ? <Button onClick={submit} disabled={loading}>{loading ? "Generating audit..." : "Generate Growth Audit"}</Button> : <Button onClick={() => setStep(step + 1)}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>}</div>
      </CardContent>
    </Card>
  );
}

function AuditResult({ result }: { result: any }) {
  if (result.error) return <Card className="p-6"><CardTitle>Supabase write needs configuration</CardTitle><p className="mt-3 text-sm text-muted-foreground">{typeof result.error === "string" ? result.error : "Check required fields and database setup."}</p></Card>;
  return <Card className="p-6"><CheckCircle2 className="h-10 w-10 text-primary" /><h2 className="mt-4 text-3xl font-bold">Audit generated</h2><p className="mt-2 text-muted-foreground">Value score: {result.valueScore?.overall}/100 • Pricing power: {result.valueScore?.pricingPower}</p><div className="mt-6 grid gap-3 md:grid-cols-2">{result.offer?.stack?.map((item: string) => <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</div>)}</div></Card>;
}
