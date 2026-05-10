import { CheckCircle2, Flag, Rocket, ShieldQuestion } from "lucide-react";
import { ValueRadar } from "@/components/dashboard/value-radar";
import { TrimStackMatrix } from "@/components/dashboard/trim-stack-matrix";
import { objectionMap, pricingTiers } from "@/lib/engines/offer-generator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const finalOffer = [
  "Offer Name: Revenue Acceleration System",
  "Positioning: premium growth infrastructure for operators",
  "Bundles: Diagnostic, Blueprint, Implementation, Retainer",
  "Guarantees: milestone and clarity risk reversal",
  "CTA: Apply for implementation sprint"
];

export default function ClientDashboard() {
  return (
    <main className="container-shell py-8">
      <div className="mb-8">
        <Badge>Client Growth OS</Badge>
        <h1 className="mt-4 text-4xl font-bold">Your offer engineering roadmap.</h1>
        <p className="mt-2 text-muted-foreground">Audit results, offer stacks, reports, uploaded resources, milestones, and pricing recommendations in one workspace.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[[Rocket, "Value Score", "78/100"], [Flag, "Pricing Power", "Strong"], [CheckCircle2, "Milestones", "4 active"]].map(([Icon, label, value]: any) => (
          <Card key={label}><CardHeader><Icon className="h-5 w-5 text-primary" /><CardDescription>{label}</CardDescription><CardTitle>{value}</CardTitle></CardHeader></Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <Card><CardHeader><CardTitle>Value Equation Radar</CardTitle></CardHeader><CardContent><ValueRadar /></CardContent></Card>
        <Card>
          <CardHeader><CardTitle>Final Offer Generator</CardTitle><CardDescription>Export-ready presentation structure.</CardDescription></CardHeader>
          <CardContent className="space-y-3">{finalOffer.map((item) => <div key={item} className="rounded-xl bg-white/[0.04] p-4 text-sm">{item}</div>)}</CardContent>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Pricing Architecture</CardTitle></CardHeader>
          <CardContent className="space-y-3">{pricingTiers.map((tier) => <div key={tier.tier} className="grid grid-cols-4 rounded-xl border border-white/10 p-3 text-sm"><span className="font-medium">{tier.tier}</span><span>{tier.range}</span><span className="text-muted-foreground">{tier.method}</span><span>{tier.margin}</span></div>)}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Objection Handling Engine</CardTitle></CardHeader>
          <CardContent className="space-y-3">{objectionMap.slice(0, 3).map((o) => <div key={o.objection} className="rounded-xl border border-white/10 p-3"><div className="flex items-center gap-2 font-medium"><ShieldQuestion className="h-4 w-4 text-primary" />{o.objection}</div><p className="mt-2 text-sm text-muted-foreground">{o.concern} → {o.solution} → {o.guarantee}</p></div>)}</CardContent>
        </Card>
      </div>
      <div className="mt-6"><Card><CardHeader><CardTitle>Bundle Assembly & Trim Matrix</CardTitle></CardHeader><CardContent><TrimStackMatrix /></CardContent></Card></div>
    </main>
  );
}
