import type { IntakeSubmission, ValueScore } from "@/lib/types";

const hasNumbers = (text: string) => /\d/.test(text);
const longEnough = (text: string, length = 80) => text.trim().length >= length;
const containsAny = (text: string, words: string[]) => words.some((word) => text.toLowerCase().includes(word));

function scoreSignals(signals: boolean[]) {
  const base = 35;
  const earned = signals.filter(Boolean).length * (65 / signals.length);
  return Math.round(Math.min(100, base + earned));
}

export function evaluateValueEquation(input: IntakeSubmission): ValueScore {
  const offerText = `${input.currentOffer} ${input.goals} ${input.pricingStructure} ${input.fulfillmentMethod}`;
  const dreamOutcome = scoreSignals([
    longEnough(input.goals, 45),
    hasNumbers(input.goals) || hasNumbers(input.currentOffer),
    containsAny(offerText, ["increase", "save", "grow", "reduce", "premium", "profit", "revenue"]),
    containsAny(offerText, ["guarantee", "outcome", "result", "transformation", "system"])
  ]);
  const perceivedLikelihood = scoreSignals([
    containsAny(offerText, ["case study", "proof", "testimonial", "guarantee", "authority"]),
    containsAny(offerText, ["framework", "system", "method", "process", "roadmap"]),
    longEnough(input.clientAcquisitionProcess, 60),
    containsAny(input.leadGenerationMethod, ["referral", "content", "webinar", "partner", "outbound"])
  ]);
  const timeDelay = scoreSignals([
    containsAny(offerText, ["fast", "days", "week", "sprint", "accelerator"]),
    containsAny(input.fulfillmentMethod, ["template", "automation", "done-for-you", "dfy", "implementation"]),
    !containsAny(input.biggestOperationalIssue, ["slow", "delay", "manual", "overwhelmed"]),
    longEnough(input.fulfillmentMethod, 45)
  ]);
  const effortSacrifice = scoreSignals([
    containsAny(input.fulfillmentMethod, ["done-for-you", "dfy", "managed", "concierge", "implementation"]),
    containsAny(offerText, ["simple", "guided", "templates", "automation", "support"]),
    !containsAny(input.biggestBottleneck, ["time", "capacity", "confusing", "complex"]),
    longEnough(input.currentOffer, 55)
  ]);

  const numerator = dreamOutcome * perceivedLikelihood;
  const denominator = Math.max(1, ((100 - timeDelay + 25) / 100) * ((100 - effortSacrifice + 25) / 100) * 100);
  const overall = Math.round(Math.min(100, numerator / denominator));
  const weaknesses = [
    dreamOutcome < 70 && "Outcome needs sharper measurable transformation language.",
    perceivedLikelihood < 70 && "Proof, authority, mechanism clarity, or risk reversal are underdeveloped.",
    timeDelay < 70 && "Time-to-value feels too slow or operationally heavy.",
    effortSacrifice < 70 && "Customer workload is too high for premium positioning."
  ].filter(Boolean) as string[];

  const recommendations = [
    "Name the dream outcome in revenue, time saved, capacity unlocked, or risk reduced.",
    "Add a proprietary mechanism with proof assets and a concrete implementation roadmap.",
    "Convert manual work into DFY/DWY accelerators, templates, scripts, and onboarding sprints.",
    "Package guarantees around controllable milestones rather than vague end outcomes."
  ];

  const pricingPower = overall >= 85 ? "Premium" : overall >= 72 ? "Strong" : overall >= 58 ? "Moderate" : "Low";
  return { overall, dreamOutcome, perceivedLikelihood, timeDelay, effortSacrifice, weaknesses, recommendations, pricingPower };
}
