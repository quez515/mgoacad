import type { DiagnosticProblem, IntakeSubmission } from "@/lib/types";

export function identifyProblems(input: IntakeSubmission): DiagnosticProblem[] {
  return [
    {
      category: "Market",
      issue: `The offer may not be differentiated enough in ${input.industry}.`,
      impact: "Weak category positioning lowers perceived value and creates price comparison pressure.",
      solutionDirection: "Define a narrow profitable avatar, painful trigger event, and measurable transformation promise."
    },
    {
      category: "Execution",
      issue: input.biggestBottleneck || "Execution bottleneck is unclear.",
      impact: "Unresolved delivery or acquisition constraints cap revenue and make scaling inconsistent.",
      solutionDirection: "Install a weekly growth operating rhythm with one acquisition KPI, one conversion KPI, and one fulfillment KPI."
    },
    {
      category: "Logistical",
      issue: input.biggestOperationalIssue || "Operational friction is not documented.",
      impact: "Hidden fulfillment load erodes margin and makes premium client experience hard to sustain.",
      solutionDirection: "Map each deliverable by cost-to-serve and client value, then trim or automate low-leverage work."
    },
    {
      category: "Psychological",
      issue: "Prospects likely need stronger confidence before buying a premium service.",
      impact: "Doubt increases sales cycle length, discounting, and ghosting after discovery calls.",
      solutionDirection: "Stack proof, mechanism education, milestone guarantees, and decision-risk reducers into the sales process."
    },
    {
      category: "Knowledge",
      issue: "The buyer may not understand the cost of staying with the status quo.",
      impact: "Without problem education, urgency stays low and prospects postpone implementation.",
      solutionDirection: "Create diagnostic content that quantifies revenue leakage, opportunity cost, and implementation path."
    },
    {
      category: "Behavioral",
      issue: "Customer effort may prevent completion even after purchase.",
      impact: "Low activation reduces outcomes, referrals, retention, and case-study generation.",
      solutionDirection: "Build activation checkpoints, done-with-you implementation sessions, and lightweight accountability loops."
    }
  ];
}
