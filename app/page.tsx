import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, Gem, Layers3, ShieldCheck, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  [BrainCircuit, "Value Equation Engine", "Scores dream outcome, likelihood, delay, and effort to expose pricing power."],
  [Target, "Bottleneck Diagnosis", "Classifies knowledge, execution, logistical, psychological, market, and behavioral constraints."],
  [Layers3, "Offer Stack Builder", "Assembles premium bundles, bonuses, guarantees, and transformation paths."],
  [BarChart3, "Pricing Architecture", "Recommends tiered pricing, value ratios, margin indicators, and ascension logic."],
  [ShieldCheck, "Objection Reversal", "Maps objections to concerns, proof, guarantees, and alternative structures."],
  [Gem, "Premium Positioning", "Turns commodity services into category-specific strategic growth infrastructure."]
] as const;

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <nav className="container-shell flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-2 font-semibold"><Sparkles className="h-5 w-5 text-primary" /> OfferOS</Link>
        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#features">Features</a><a href="#process">Process</a><a href="#faq">FAQ</a>
        </div>
        <Button asChild variant="outline"><Link href="/login">Sign in</Link></Button>
      </nav>

      <section className="container-shell relative py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Badge>AI-powered consulting operating system</Badge>
          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">AI-Powered Offer Engineering & Growth Infrastructure For Service Businesses</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Engineer premium offers, diagnose revenue bottlenecks, optimize pricing, and turn scattered growth work into a structured operating system.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/audit">Get Your Growth Audit <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/client">View client dashboard</Link></Button>
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            ["Value Score", "84/100", "Pricing power rising"],
            ["Revenue Leak", "$18.4K", "Diagnosed opportunity"],
            ["Offer Ratio", "7.8x", "Value-to-price target"]
          ].map(([label, value, detail]) => <Card key={label}><CardHeader><CardDescription>{label}</CardDescription><CardTitle className="text-4xl premium-gradient">{value}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">{detail}</CardContent></Card>)}
        </div>
      </section>

      <section className="container-shell py-16">
        <Card className="p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div><Badge>Problem</Badge><h2 className="mt-4 text-3xl font-bold">Most service businesses do not have an offer problem. They have a value communication, proof, packaging, and delivery architecture problem.</h2></div>
            <div className="space-y-4 text-muted-foreground"><p>OfferOS operationalizes the Grand Slam Offer value equation into a measurable workflow: increase dream outcome and likelihood while reducing delay and effort.</p><p>The result is a consultant-grade audit system for owners stuck between $5K–$30K/month who need premium positioning and scalable growth decisions.</p></div>
          </div>
        </Card>
      </section>

      <section id="process" className="container-shell py-16">
        <div className="mb-10 max-w-2xl"><Badge>How it works</Badge><h2 className="mt-4 text-4xl font-bold">From intake to engineered offer in one operating workflow.</h2></div>
        <div className="grid gap-4 md:grid-cols-4">{["Submit business intelligence", "Score value equation", "Diagnose bottlenecks", "Generate premium offer system"].map((step, index) => <Card key={step} className="p-6"><div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">{index + 1}</div><h3 className="font-semibold">{step}</h3></Card>)}</div>
      </section>

      <section id="features" className="container-shell py-16">
        <div className="mb-10 max-w-2xl"><Badge>Infrastructure</Badge><h2 className="mt-4 text-4xl font-bold">Everything needed to turn an offer into a premium growth system.</h2></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map(([Icon, title, desc]) => <Card key={title}><CardHeader><Icon className="h-6 w-6 text-primary" /><CardTitle>{title}</CardTitle><CardDescription>{desc}</CardDescription></CardHeader></Card>)}</div>
      </section>

      <section className="container-shell py-16"><Card className="p-10 text-center"><h2 className="text-4xl font-bold">Ready to identify your highest-leverage growth constraints?</h2><p className="mx-auto mt-4 max-w-xl text-muted-foreground">Submit the audit intake and receive a structured value score, diagnostic, and first-pass offer architecture.</p><Button asChild size="lg" className="mt-8"><Link href="/audit">Get Your Growth Audit</Link></Button></Card></section>

      <section className="container-shell grid gap-4 py-16 md:grid-cols-3">{["The dashboard made our offer gaps obvious.", "We finally had pricing tiers tied to delivery margin.", "The objection map changed our sales calls."].map((quote) => <Card key={quote} className="p-6"><CheckCircle2 className="h-5 w-5 text-primary" /><p className="mt-4 text-sm text-muted-foreground">“{quote}”</p><p className="mt-5 text-sm font-semibold">Placeholder Client</p></Card>)}</section>

      <section id="faq" className="container-shell py-16"><div className="grid gap-4 md:grid-cols-2">{["Is this a CRM?", "Does it use AI?", "Who is it for?", "Can it run on Vercel?"].map((q) => <Card key={q} className="p-6"><h3 className="font-semibold">{q}</h3><p className="mt-2 text-sm text-muted-foreground">OfferOS is a strategic operating workflow with Supabase-backed data, deterministic scoring engines, and AI-ready report structures for service businesses.</p></Card>)}</div></section>
      <footer className="container-shell border-t border-white/10 py-8 text-sm text-muted-foreground">© 2026 OfferOS. Premium offer engineering infrastructure.</footer>
    </main>
  );
}
