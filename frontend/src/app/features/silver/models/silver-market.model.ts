export type SilverExchange = 'mcx' | 'comex' | 'spot';
export type SilverCurrency = 'inr' | 'usd';
export type SilverTimeframe = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y';

export interface SilverSeries {
  id: string;
  label: string;
  color: string;
  values: ReadonlyArray<number>;
  visible: boolean;
}

export type FlowDirection = 'inflow' | 'outflow' | 'flat';

export interface MarketFlowRow {
  id: string;
  label: string;
  detail: string;
  value: string;
  changeLabel: string;
  direction: FlowDirection;
}

export type PolicyImpact = 'bullish' | 'bearish' | 'neutral';

export interface PolicyUpdate {
  id: string;
  region: string;
  flag: string;
  headline: string;
  body: string;
  impact: PolicyImpact;
  timestamp: string;
}

export type InsightTag = 'spread' | 'flow' | 'demand' | 'supply' | 'macro' | 'correlation';

export interface AiInsight {
  id: string;
  tag: InsightTag;
  title: string;
  detail: string;
  confidence: 'low' | 'medium' | 'high';
}

export interface EtfFlowRow {
  id: string;
  fund: string;
  ticker: string;
  flow: number;
  flowLabel: string;
  aum: string;
  direction: FlowDirection;
}

export type EventImportance = 'low' | 'medium' | 'high';

export interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  region: string;
  flag: string;
  title: string;
  importance: EventImportance;
}

export interface DriverCard {
  id: string;
  title: string;
  stance: 'supportive' | 'pressuring' | 'mixed';
  strength: number;
  detail: string;
  trend: ReadonlyArray<number>;
}
