import Link from "next/link";
import { IntakeForm } from "./intake-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AuditPage() {
  return <main className="container-shell py-8"><div className="mb-8 flex items-center justify-between"><Link href="/" className="font-semibold">OfferOS</Link><Button asChild variant="outline"><Link href="/login">Sign in</Link></Button></div><div className="mx-auto max-w-3xl"><Badge>Business Intake Engine</Badge><h1 className="mt-4 text-4xl font-bold">Submit your growth intelligence.</h1><p className="mt-3 text-muted-foreground">The intake creates a lead profile, audit record, value score, diagnostic, and first-pass offer architecture in Supabase.</p><div className="mt-8"><IntakeForm /></div></div></main>;
}
