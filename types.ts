
export enum PacingStatus {
  OnTrack = 'On Track',
  UnderPacing = 'Under-pacing',
  OverPacing = 'Over-pacing',
  OverBudget = 'Over-budget',
}

export interface Campaign {
  id: string;
  name: string;
  accountId: string;
  accountName: string;
  spend: number;
  budget: number;
  dailyBudget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  convValue: number;
  ctr: number;
  roas: number;
  pacing: number;
  pacingStatus: PacingStatus;
}

export interface Account {
  id: string;
  name: string;
  campaigns: Campaign[];
  spend: number;
  budget: number;
  dailyBudget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  convValue: number;
  ctr: number;
  roas: number;
  pacing: number;
  pacingStatus: PacingStatus;
}

export type RawSheetRow = string[];
