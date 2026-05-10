const quadrants = [
  { title: "High Cost / Low Value", tone: "border-red-400/30", items: ["Custom reporting nobody reads", "Manual onboarding calls"] },
  { title: "High Cost / High Value", tone: "border-amber-300/30", items: ["DFY implementation", "Strategic roadmap workshop"] },
  { title: "Low Cost / Low Value", tone: "border-slate-400/30", items: ["Generic resource library", "Unguided office hours"] },
  { title: "Low Cost / High Value", tone: "border-emerald-300/30", items: ["Templates", "Decision scripts", "Scorecard dashboard"] }
];
export function TrimStackMatrix() {
  return <div className="grid gap-3 md:grid-cols-2">{quadrants.map((q) => <div key={q.title} className={`rounded-2xl border ${q.tone} bg-white/[0.04] p-4`}><h3 className="font-semibold">{q.title}</h3><div className="mt-4 space-y-2">{q.items.map((item) => <div key={item} className="rounded-xl bg-black/20 p-3 text-sm text-muted-foreground">{item}</div>)}</div></div>)}</div>;
}
