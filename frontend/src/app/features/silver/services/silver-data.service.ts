import { Injectable, computed, signal } from '@angular/core';
import { MarketCardData } from '../../../shared/market-card/market-card.model';
import {
  AiInsight,
  CalendarEvent,
  DriverCard,
  EtfFlowRow,
  MarketFlowRow,
  PolicyUpdate,
  SilverCurrency,
  SilverExchange,
  SilverSeries,
  SilverTimeframe,
} from '../models/silver-market.model';

/**
 * Centralized intelligence stub for the Silver vertical.
 *
 * No backend exists yet. All values are deliberately realistic placeholders
 * so the workspace renders as a believable research surface. When a real
 * data layer lands, components keep their existing signal API contracts —
 * only the internals of this service change.
 */
@Injectable({ providedIn: 'root' })
export class SilverDataService {
  readonly exchange = signal<SilverExchange>('mcx');
  readonly currency = signal<SilverCurrency>('inr');
  readonly timeframe = signal<SilverTimeframe>('3M');

  setExchange(value: SilverExchange): void {
    this.exchange.set(value);
  }

  setCurrency(value: SilverCurrency): void {
    this.currency.set(value);
  }

  setTimeframe(value: SilverTimeframe): void {
    this.timeframe.set(value);
  }

  readonly snapshotCards = computed<ReadonlyArray<MarketCardData>>(() => {
    const cur = this.currency();
    return [
      {
        id: 'mcx-silver',
        symbol: 'SILVER',
        venue: 'MCX',
        name: 'Mar 26 Futures',
        price: cur === 'inr' ? 92_485 : 1110.4,
        unit: cur === 'inr' ? 'kg' : 'kg',
        currency: cur === 'inr' ? '₹' : '$',
        changeAbs: cur === 'inr' ? 612 : 7.3,
        changePct: 0.67,
        sparkline: [88200, 88560, 89010, 89740, 90120, 90420, 90880, 91260, 91510, 91820, 92140, 92485],
        precision: cur === 'inr' ? 0 : 2,
      },
      {
        id: 'comex-silver',
        symbol: 'SI',
        venue: 'COMEX',
        name: 'Front-month Futures',
        price: 30.74,
        unit: 'oz',
        currency: '$',
        changeAbs: 0.18,
        changePct: 0.59,
        sparkline: [29.4, 29.55, 29.7, 29.9, 30.05, 30.18, 30.31, 30.42, 30.48, 30.6, 30.65, 30.74],
        precision: 2,
      },
      {
        id: 'spot-silver',
        symbol: 'XAG',
        venue: 'Spot',
        name: 'Global benchmark',
        price: 30.62,
        unit: 'oz',
        currency: '$',
        changeAbs: 0.12,
        changePct: 0.39,
        sparkline: [29.2, 29.4, 29.6, 29.85, 30.0, 30.12, 30.22, 30.35, 30.4, 30.48, 30.55, 30.62],
        precision: 2,
      },
      {
        id: 'usdinr',
        symbol: 'USDINR',
        venue: 'FX',
        name: 'Reference rate',
        price: 83.42,
        unit: undefined,
        currency: '₹',
        changeAbs: -0.06,
        changePct: -0.07,
        sparkline: [83.6, 83.58, 83.55, 83.5, 83.48, 83.46, 83.5, 83.52, 83.48, 83.45, 83.43, 83.42],
        precision: 2,
      },
      {
        id: 'slv-etf',
        symbol: 'SLV',
        venue: 'NYSE Arca',
        name: 'iShares Silver Trust',
        price: 28.04,
        unit: undefined,
        currency: '$',
        changeAbs: 0.21,
        changePct: 0.75,
        sparkline: [26.9, 27.05, 27.15, 27.32, 27.48, 27.6, 27.72, 27.84, 27.9, 27.96, 28.0, 28.04],
        precision: 2,
      },
      {
        id: 'gold-silver',
        symbol: 'XAU/XAG',
        venue: 'Ratio',
        name: 'Gold / Silver',
        price: 84.7,
        unit: undefined,
        currency: undefined,
        changeAbs: -0.4,
        changePct: -0.47,
        sparkline: [86.2, 86.1, 85.9, 85.7, 85.5, 85.4, 85.2, 85.1, 85.0, 84.9, 84.8, 84.7],
        precision: 1,
      },
    ];
  });

  readonly chartSeries = computed<ReadonlyArray<SilverSeries>>(() => {
    return [
      {
        id: 'mcx',
        label: 'MCX Silver',
        color: 'var(--series-1)',
        visible: true,
        values: generateSeries(SEED_MCX, 96, 0.012),
      },
      {
        id: 'comex',
        label: 'COMEX Silver',
        color: 'var(--series-2)',
        visible: true,
        values: generateSeries(SEED_COMEX, 96, 0.014),
      },
      {
        id: 'spot',
        label: 'Spot Silver',
        color: 'var(--series-3)',
        visible: true,
        values: generateSeries(SEED_SPOT, 96, 0.013),
      },
      {
        id: 'usdinr',
        label: 'USD/INR',
        color: 'var(--series-4)',
        visible: true,
        values: generateSeries(SEED_USDINR, 96, 0.004),
      },
      {
        id: 'slv',
        label: 'SLV ETF',
        color: 'var(--series-5)',
        visible: true,
        values: generateSeries(SEED_SLV, 96, 0.015),
      },
    ];
  });

  readonly marketFlows: ReadonlyArray<MarketFlowRow> = [
    {
      id: 'etf-flows',
      label: 'Silver ETF flows',
      detail: 'SLV, SIVR, PSLV — 5d net',
      value: '+612.4 t',
      changeLabel: '+148 t WoW',
      direction: 'inflow',
    },
    {
      id: 'comex-positioning',
      label: 'COMEX managed money',
      detail: 'CFTC net long contracts',
      value: '48,210',
      changeLabel: '+3,920 vs prior',
      direction: 'inflow',
    },
    {
      id: 'open-interest',
      label: 'Futures open interest',
      detail: 'COMEX SI, all contracts',
      value: '152,840',
      changeLabel: '+1.8% w/w',
      direction: 'inflow',
    },
    {
      id: 'retail-demand',
      label: 'Retail bullion demand',
      detail: 'US mint + EU dealer premia',
      value: 'Softening',
      changeLabel: 'Premium 4.1% → 3.4%',
      direction: 'outflow',
    },
    {
      id: 'institutional',
      label: 'Institutional positioning',
      detail: 'OTC dealer net exposure',
      value: 'Net long',
      changeLabel: 'Conviction rising',
      direction: 'inflow',
    },
    {
      id: 'shanghai-premium',
      label: 'Shanghai premium',
      detail: 'SHFE vs LBMA spot',
      value: '+$0.42 / oz',
      changeLabel: '−$0.08 d/d',
      direction: 'outflow',
    },
  ];

  readonly policyUpdates: ReadonlyArray<PolicyUpdate> = [
    {
      id: 'fed-minutes',
      region: 'United States',
      flag: 'US',
      headline: 'FOMC minutes flag patience on rate path',
      body: 'Members reiterate data dependence; market repricing one fewer cut into year-end.',
      impact: 'bullish',
      timestamp: '2h ago',
    },
    {
      id: 'india-import-duty',
      region: 'India',
      flag: 'IN',
      headline: 'Import duty unchanged in interim budget review',
      body: 'No revision to the 15% effective duty on silver imports. MCX–spot spread holding.',
      impact: 'neutral',
      timestamp: '6h ago',
    },
    {
      id: 'china-industrial',
      region: 'China',
      flag: 'CN',
      headline: 'NDRC industrial output guidance lifted',
      body: 'Solar capex targets raised 8% for the year — supportive for industrial silver demand.',
      impact: 'bullish',
      timestamp: 'Yesterday',
    },
    {
      id: 'mexico-mining',
      region: 'Mexico',
      flag: 'MX',
      headline: 'Fresnillo flags lower mid-year throughput',
      body: 'Operational disruption at Saucito; guidance trimmed by 4–6%.',
      impact: 'bullish',
      timestamp: 'Yesterday',
    },
    {
      id: 'ecb-statement',
      region: 'Eurozone',
      flag: 'EU',
      headline: 'ECB cautious tone, dollar bid into close',
      body: 'EUR weakness mechanically pressures dollar-denominated silver.',
      impact: 'bearish',
      timestamp: '2d ago',
    },
  ];

  readonly aiInsights: ReadonlyArray<AiInsight> = [
    {
      id: 'mcx-comex-premium',
      tag: 'spread',
      title: 'MCX premium over COMEX widening',
      detail: 'Local premium has expanded 1.4% over the last five sessions, outpacing the USD/INR move.',
      confidence: 'high',
    },
    {
      id: 'etf-streak',
      tag: 'flow',
      title: 'ETF inflows for a third consecutive session',
      detail: 'SLV and SIVR together added 612 tonnes; first such streak since November.',
      confidence: 'medium',
    },
    {
      id: 'industrial-demand',
      tag: 'demand',
      title: 'Industrial demand outlook improving',
      detail: 'Solar capacity expansion in China and India is reshaping demand mix away from investment-only flows.',
      confidence: 'medium',
    },
    {
      id: 'ratio-mean-revert',
      tag: 'correlation',
      title: 'Gold/silver ratio rolling lower',
      detail: 'Ratio now 84.7, down from 88+ a month ago — silver outperforming gold on the margin.',
      confidence: 'high',
    },
    {
      id: 'supply-disruption',
      tag: 'supply',
      title: 'Mining supply risk re-emerging',
      detail: 'Two of the top ten producers have softened guidance this month; aggregate cut ~3%.',
      confidence: 'medium',
    },
    {
      id: 'real-yields',
      tag: 'macro',
      title: 'Real yields trending lower into next CPI',
      detail: '10y TIPS off 14bps from monthly high — historically supportive backdrop for silver.',
      confidence: 'low',
    },
  ];

  readonly etfFlows: ReadonlyArray<EtfFlowRow> = [
    {
      id: 'slv',
      fund: 'iShares Silver Trust',
      ticker: 'SLV',
      flow: 184.2,
      flowLabel: '+184.2 t',
      aum: '$13.8 B',
      direction: 'inflow',
    },
    {
      id: 'sivr',
      fund: 'abrdn Physical Silver',
      ticker: 'SIVR',
      flow: 32.6,
      flowLabel: '+32.6 t',
      aum: '$1.4 B',
      direction: 'inflow',
    },
    {
      id: 'pslv',
      fund: 'Sprott Physical Silver',
      ticker: 'PSLV',
      flow: 41.0,
      flowLabel: '+41.0 t',
      aum: '$5.2 B',
      direction: 'inflow',
    },
    {
      id: 'agq',
      fund: 'ProShares Ultra Silver',
      ticker: 'AGQ',
      flow: -12.4,
      flowLabel: '−12.4 t',
      aum: '$420 M',
      direction: 'outflow',
    },
    {
      id: 'silj',
      fund: 'Amplify Junior Silver Miners',
      ticker: 'SILJ',
      flow: 9.1,
      flowLabel: '+9.1 t',
      aum: '$760 M',
      direction: 'inflow',
    },
  ];

  readonly calendarEvents: ReadonlyArray<CalendarEvent> = [
    {
      id: 'us-cpi',
      date: 'Wed',
      time: '13:30 UTC',
      region: 'United States',
      flag: 'US',
      title: 'US CPI release',
      importance: 'high',
    },
    {
      id: 'fed-speakers',
      date: 'Wed',
      time: '18:00 UTC',
      region: 'United States',
      flag: 'US',
      title: 'Fed Williams remarks',
      importance: 'medium',
    },
    {
      id: 'rbi-policy',
      date: 'Thu',
      time: '04:30 UTC',
      region: 'India',
      flag: 'IN',
      title: 'RBI policy decision',
      importance: 'medium',
    },
    {
      id: 'china-pmi',
      date: 'Fri',
      time: '01:45 UTC',
      region: 'China',
      flag: 'CN',
      title: 'Caixin manufacturing PMI',
      importance: 'high',
    },
    {
      id: 'opec-monthly',
      date: 'Mon',
      time: '11:00 UTC',
      region: 'Global',
      flag: 'EU',
      title: 'Silver Institute monthly report',
      importance: 'low',
    },
  ];

  readonly drivers: ReadonlyArray<DriverCard> = [
    {
      id: 'industrial-demand',
      title: 'Industrial demand',
      stance: 'supportive',
      strength: 78,
      detail: 'Solar build-out, EV electronics and 5G infrastructure continue to absorb fabrication-grade supply.',
      trend: [60, 62, 63, 65, 67, 68, 70, 72, 74, 76, 77, 78],
    },
    {
      id: 'investment-demand',
      title: 'Investment demand',
      stance: 'supportive',
      strength: 64,
      detail: 'ETF flows and OTC long positioning have both turned constructive over the last two weeks.',
      trend: [48, 50, 52, 54, 55, 58, 60, 61, 62, 63, 64, 64],
    },
    {
      id: 'physical-premium',
      title: 'Physical premium',
      stance: 'mixed',
      strength: 42,
      detail: 'Indian local premium firm; US retail bullion premiums easing on tepid coin demand.',
      trend: [54, 52, 50, 48, 46, 45, 44, 43, 43, 42, 42, 42],
    },
    {
      id: 'supply-outlook',
      title: 'Supply outlook',
      stance: 'supportive',
      strength: 71,
      detail: 'Mine guidance cuts at two majors; secondary supply unchanged. Net deficit profile intact.',
      trend: [55, 56, 58, 60, 62, 64, 66, 68, 70, 70, 71, 71],
    },
  ];
}

// --- internal series generator --------------------------------------------

function generateSeries(seed: number, count: number, volatility: number): ReadonlyArray<number> {
  const out: number[] = [];
  let value = seed;
  let s = seed * 13;
  for (let i = 0; i < count; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    const drift = Math.sin(i / 14) * volatility * seed * 0.55;
    const noise = (r - 0.5) * volatility * seed;
    value = value + drift * 0.06 + noise * 0.1;
    out.push(Number(value.toFixed(4)));
  }
  return out;
}

const SEED_MCX = 90_000;
const SEED_COMEX = 30;
const SEED_SPOT = 30;
const SEED_USDINR = 83;
const SEED_SLV = 28;
