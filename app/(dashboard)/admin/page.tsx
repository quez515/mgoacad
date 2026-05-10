import { Activity, ClipboardList, Users, WalletCards } from "lucide-react";
import { ValueRadar } from "@/components/dashboard/value-radar";
import { TrimStackMatrix } from "@/components/dashboard/trim-stack-matrix";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const leads = [
  ["Northstar Ads", "Qualified", "$18K/mo", "Offer clarity"],
  ["ScaleOps Studio", "Audit Complete", "$24K/mo", "Pricing power"],
  ["FounderFit", "Discovery Call", "$9K/mo", "Lead quality"],
  ["OpsFlow", "Proposal Sent", "$30K/mo", "Fulfillment margin"]
];
const stages = ["New Lead", "Qualified", "Audit Complete", "Discovery Call", "Proposal Sent", "Client Active", "Retainer"];
const metrics = [[Users, "Leads", 42], [ClipboardList, "Audits", 18], [WalletCards, "Proposal Value", "$148K"], [Activity, "Tasks Due", 11]];

export default function AdminDashboard() {
  return (
    <main className="container-shell py-8">
      <div className="mb-8">
        <Badge>Admin Command Center</Badge>
        <h1 className="mt-4 text-4xl font-bold">Offer engineering pipeline.</h1>
        <p className="mt-2 text-muted-foreground">Manage leads, audits, notes, activity logs, reports, and implementation tasks across every client account.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map(([Icon, label, value]: any) => (
          <Card key={label}><CardHeader><Icon className="h-5 w-5 text-primary" /><CardDescription>{label}</CardDescription><CardTitle>{value}</CardTitle></CardHeader></Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <Card>
          <CardHeader><CardTitle>Pipeline</CardTitle><CardDescription>Hormozi-inspired audit-to-retainer workflow.</CardDescription></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-7">
            {stages.map((stage) => <div key={stage} className="min-h-32 rounded-xl border border-white/10 bg-white/[0.03] p-3"><p className="text-xs font-semibold">{stage}</p></div>)}
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle>Value score distribution</CardTitle></CardHeader><CardContent><ValueRadar /></CardContent></Card>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Lead Management</CardTitle></CardHeader>
          <CardContent><div className="space-y-3">{leads.map(([name, status, rev, bottleneck]) => <div key={name} className="grid grid-cols-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm"><span className="font-medium">{name}</span><span>{status}</span><span>{rev}</span><span className="text-muted-foreground">{bottleneck}</span></div>)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Trim & Stack Matrix</CardTitle><CardDescription>Optimize value while protecting delivery margin.</CardDescription></CardHeader>
          <CardContent><TrimStackMatrix /></CardContent>
        </Card>
      </div>
    </main>
  );
}
