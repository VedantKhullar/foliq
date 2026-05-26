import { Component, computed, inject, signal } from '@angular/core';
import {
  SegmentOption,
  SegmentedControlComponent,
} from '../../../../shared/segmented-control/segmented-control.component';
import { SilverDataService } from '../../services/silver-data.service';
import { SilverTimeframe } from '../../models/silver-market.model';

interface RenderedSeries {
  id: string;
  label: string;
  color: string;
  visible: boolean;
  path: string;
  endY: number;
  changePct: number;
}

@Component({
  selector: 'app-silver-comparison-chart',
  standalone: true,
  imports: [SegmentedControlComponent],
  templateUrl: './silver-comparison-chart.component.html',
  styleUrl: './silver-comparison-chart.component.scss',
})
export class SilverComparisonChartComponent {
  private readonly data = inject(SilverDataService);

  protected readonly viewWidth = 1000;
  protected readonly viewHeight = 360;
  protected readonly padTop = 16;
  protected readonly padRight = 56;
  protected readonly padBottom = 28;
  protected readonly padLeft = 0;

  protected readonly timeframe = this.data.timeframe;
  protected readonly mode = signal<'normalized' | 'price'>('normalized');

  protected readonly visibilityOverrides = signal<Readonly<Record<string, boolean>>>({});

  protected readonly timeframeOptions: ReadonlyArray<SegmentOption<SilverTimeframe>> = [
    { value: '1D', label: '1D' },
    { value: '1W', label: '1W' },
    { value: '1M', label: '1M' },
    { value: '3M', label: '3M' },
    { value: '6M', label: '6M' },
    { value: '1Y', label: '1Y' },
    { value: '5Y', label: '5Y' },
  ];

  protected readonly modeOptions: ReadonlyArray<SegmentOption<'normalized' | 'price'>> = [
    { value: 'normalized', label: 'Normalized' },
    { value: 'price', label: 'Price' },
  ];

  protected readonly series = computed<ReadonlyArray<RenderedSeries>>(() => {
    const overrides = this.visibilityOverrides();
    const rawSeries = this.data.chartSeries();
    const mode = this.mode();

    const innerW = this.viewWidth - this.padLeft - this.padRight;
    const innerH = this.viewHeight - this.padTop - this.padBottom;

    // build normalized arrays first to determine shared y-range
    const normalizedAll = rawSeries.map((s) => {
      const base = s.values[0] || 1;
      return s.values.map((v) => (v / base) * 100);
    });

    let yMin = Infinity;
    let yMax = -Infinity;

    if (mode === 'normalized') {
      for (const arr of normalizedAll) {
        for (const v of arr) {
          if (v < yMin) yMin = v;
          if (v > yMax) yMax = v;
        }
      }
    } else {
      // price mode: each series projected to its own 0..1 within shared axis 0..120
      yMin = 0;
      yMax = 120;
    }

    const yPad = (yMax - yMin) * 0.08;
    yMin -= yPad;
    yMax += yPad;
    const yRange = yMax - yMin || 1;

    return rawSeries.map((s, idx) => {
      const visible = overrides[s.id] ?? s.visible;
      const arr =
        mode === 'normalized'
          ? normalizedAll[idx]
          : (() => {
              const sMin = Math.min(...s.values);
              const sMax = Math.max(...s.values);
              const sRange = sMax - sMin || 1;
              return s.values.map((v) => ((v - sMin) / sRange) * 100 + 10);
            })();

      const stepX = innerW / Math.max(1, arr.length - 1);
      let endY = 0;
      const path = arr
        .map((v, i) => {
          const x = this.padLeft + i * stepX;
          const y = this.padTop + innerH * (1 - (v - yMin) / yRange);
          if (i === arr.length - 1) endY = y;
          return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
        })
        .join(' ');

      const first = s.values[0];
      const last = s.values[s.values.length - 1];
      const changePct = ((last - first) / first) * 100;

      return {
        id: s.id,
        label: s.label,
        color: s.color,
        visible,
        path,
        endY,
        changePct,
      };
    });
  });

  protected readonly yTicks = computed<ReadonlyArray<{ y: number; label: string }>>(() => {
    const innerH = this.viewHeight - this.padTop - this.padBottom;
    const ticks = 5;
    const out: { y: number; label: string }[] = [];
    const visibleSeries = this.series().filter((s) => s.visible);
    if (!visibleSeries.length) return out;

    if (this.mode() === 'normalized') {
      const values = this.data.chartSeries().flatMap((s) => s.values.map((v) => (v / s.values[0]) * 100));
      const yMin = Math.min(...values) * 0.99;
      const yMax = Math.max(...values) * 1.01;
      for (let i = 0; i <= ticks; i++) {
        const t = i / ticks;
        const v = yMin + (yMax - yMin) * (1 - t);
        const y = this.padTop + innerH * t;
        out.push({ y, label: v.toFixed(0) });
      }
    } else {
      for (let i = 0; i <= ticks; i++) {
        const t = i / ticks;
        const y = this.padTop + innerH * t;
        out.push({ y, label: '' });
      }
    }
    return out;
  });

  protected readonly xTicks = computed<ReadonlyArray<{ x: number; label: string }>>(() => {
    const innerW = this.viewWidth - this.padLeft - this.padRight;
    const labels = this.xLabelsForTimeframe(this.timeframe());
    return labels.map((label, i) => ({
      x: this.padLeft + (innerW * i) / (labels.length - 1),
      label,
    }));
  });

  protected setTimeframe(value: SilverTimeframe): void {
    this.data.setTimeframe(value);
  }

  protected setMode(value: 'normalized' | 'price'): void {
    this.mode.set(value);
  }

  protected toggleSeries(id: string): void {
    const current = this.visibilityOverrides();
    const existing = this.series().find((s) => s.id === id);
    if (!existing) return;
    this.visibilityOverrides.set({ ...current, [id]: !existing.visible });
  }

  protected formatChange(pct: number): string {
    const sign = pct > 0 ? '+' : pct < 0 ? '−' : '';
    return `${sign}${Math.abs(pct).toFixed(2)}%`;
  }

  protected tone(pct: number): 'positive' | 'negative' | 'neutral' {
    if (pct > 0.05) return 'positive';
    if (pct < -0.05) return 'negative';
    return 'neutral';
  }

  private xLabelsForTimeframe(tf: SilverTimeframe): string[] {
    switch (tf) {
      case '1D':
        return ['09:30', '11:00', '12:30', '14:00', '15:30', 'Close'];
      case '1W':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      case '1M':
        return ['W1', 'W2', 'W3', 'W4'];
      case '3M':
        return ['Jan', 'Feb', 'Mar'];
      case '6M':
        return ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
      case '1Y':
        return ['Q1', 'Q2', 'Q3', 'Q4'];
      case '5Y':
        return ['’21', '’22', '’23', '’24', '’25'];
    }
  }
}
