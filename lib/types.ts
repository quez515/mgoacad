export type Role = "admin" | "client" | "prospect";
export type PipelineStage = "New Lead" | "Qualified" | "Audit Complete" | "Discovery Call" | "Proposal Sent" | "Client Active" | "Retainer";

export interface IntakeSubmission {
  name: string;
  email: string;
  businessName: string;
  industry: string;
  monthlyRevenue: string;
  currentOffer: string;
  pricingStructure: string;
  leadGenerationMethod: string;
  biggestBottleneck: string;
  goals: string;
  clientAcquisitionProcess: string;
  fulfillmentMethod: string;
  biggestOperationalIssue: string;
}

export interface ValueScore {
  overall: number;
  dreamOutcome: number;
  perceivedLikelihood: number;
  timeDelay: number;
  effortSacrifice: number;
  weaknesses: string[];
  recommendations: string[];
  pricingPower: "Low" | "Moderate" | "Strong" | "Premium";
}

export interface DiagnosticProblem {
  category: "Knowledge" | "Execution" | "Logistical" | "Psychological" | "Market" | "Behavioral";
  issue: string;
  impact: string;
  solutionDirection: string;
}

export interface OfferRecommendation {
  name: string;
  positioning: string;
  stack: string[];
  bonuses: string[];
  guarantees: string[];
  accelerationMechanisms: string[];
  priceRange: string;
}
