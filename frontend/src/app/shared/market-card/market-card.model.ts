export interface MarketCardData {
  id: string;
  symbol: string;
  name: string;
  venue?: string;
  price: number;
  unit?: string;
  currency?: string;
  changeAbs: number;
  changePct: number;
  sparkline: ReadonlyArray<number>;
  precision?: number;
}
