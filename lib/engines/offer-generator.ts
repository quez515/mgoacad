import type { IntakeSubmission, OfferRecommendation } from "@/lib/types";
import { evaluateValueEquation } from "./value-equation";

export function generateOffer(input: IntakeSubmission): OfferRecommendation {
  const value = evaluateValueEquation(input);
  const industry = input.industry || "service business";
  return {
    name: `${industry} Revenue Acceleration System`,
    positioning: `A premium implementation program that helps ${industry} operators convert their current offer into a clearer, higher-value growth system without adding unnecessary fulfillment complexity.`,
    stack: [
      "Strategic offer audit and value equation scorecard",
      "Premium positioning rewrite and promise architecture",
      "Trim & Stack deliverable matrix with margin optimization",
      "Acquisition funnel and discovery call conversion roadmap",
      "90-day implementation operating cadence"
    ],
    bonuses: [
      "Proof Asset Builder: case-study and testimonial capture templates",
      "Objection Reversal Library for premium sales conversations",
      "Client Activation Kit with onboarding scripts and milestone checklists",
      "Pricing Confidence Calculator with value ratio model"
    ],
    guarantees: [
      "Milestone guarantee: implementation assets delivered within the first 14 days",
      "Clarity guarantee: leave with a named offer, pricing tiers, and sales narrative"
    ],
    accelerationMechanisms: [
      "48-hour intake synthesis",
      "DFY offer stack draft",
      "Weekly decision dashboard",
      "Client workload reduction through templates and guided sprints"
    ],
    priceRange: value.pricingPower === "Premium" ? "$8,000–$15,000" : value.pricingPower === "Strong" ? "$5,000–$9,000" : "$2,500–$6,000"
  };
}

export const pricingTiers = [
  { tier: "Diagnostic", range: "$750–$1,500", customer: "Problem-aware prospects", method: "Async audit", margin: "Very High" },
  { tier: "Blueprint", range: "$2,500–$5,000", customer: "Ready-to-implement owners", method: "DWY strategy sprint", margin: "High" },
  { tier: "Implementation", range: "$6,000–$12,000", customer: "Growth-constrained operators", method: "Hybrid DFY/DWY", margin: "Strong" },
  { tier: "Operating System", range: "$3,000–$8,000/mo", customer: "Retainer-ready clients", method: "Managed growth cadence", margin: "Recurring" }
];

export const objectionMap = [
  { objection: "Too expensive", concern: "Fear of negative ROI", solution: "Anchor price to leakage and upside", guarantee: "Milestone delivery guarantee", proof: "ROI case study", alternative: "Start with paid diagnostic" },
  { objection: "No time", concern: "Implementation burden", solution: "Reduce customer workload with DFY assets", guarantee: "48-hour first asset", proof: "Time-to-launch examples", alternative: "Concierge tier" },
  { objection: "Tried before", concern: "Low perceived likelihood", solution: "Explain proprietary mechanism and failure diagnosis", guarantee: "Clarity guarantee", proof: "Before/after offer teardown", alternative: "Pilot sprint" },
  { objection: "Unsure if it works", concern: "Trust gap", solution: "Show proof and measurable checkpoints", guarantee: "Checkpoint-based risk reversal", proof: "Testimonials and score improvements", alternative: "Audit-first path" },
  { objection: "Need approval", concern: "Social/organizational risk", solution: "Provide internal business case", guarantee: "Decision memo included", proof: "Executive summary report", alternative: "Stakeholder workshop" }
];
