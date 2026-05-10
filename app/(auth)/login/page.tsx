import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return <main className="container-shell flex min-h-screen items-center justify-center py-12"><Card className="w-full max-w-md"><CardHeader><Link href="/" className="text-sm text-muted-foreground">← OfferOS</Link><CardTitle>Access your operating system</CardTitle><CardDescription>Supabase authentication-ready login for admin, client, and prospect roles.</CardDescription></CardHeader><CardContent className="space-y-4"><Input placeholder="you@company.com" type="email" /><Input placeholder="Password" type="password" /><Button className="w-full">Sign in</Button><p className="text-xs text-muted-foreground">Connect this form to Supabase Auth using the provided client helpers and role-based profiles table.</p></CardContent></Card></main>;
}
