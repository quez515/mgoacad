"use client";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

const data = [
  { subject: "Dream", score: 82 }, { subject: "Likelihood", score: 68 }, { subject: "Speed", score: 74 }, { subject: "Ease", score: 61 }, { subject: "Proof", score: 72 }, { subject: "Margin", score: 79 }
];
export function ValueRadar() {
  return <div className="h-72"><ResponsiveContainer width="100%" height="100%"><RadarChart data={data}><PolarGrid stroke="rgba(255,255,255,.16)" /><PolarAngleAxis dataKey="subject" tick={{ fill: "#cbd5e1", fontSize: 12 }} /><Radar dataKey="score" stroke="#67e8f9" fill="#67e8f9" fillOpacity={0.25} /></RadarChart></ResponsiveContainer></div>;
}
