import { Component, computed, input } from '@angular/core';
import { SparklineComponent } from '../sparkline/sparkline.component';
import { MarketCardData } from './market-card.model';

@Component({
  selector: 'app-market-card',
  standalone: true,
  imports: [SparklineComponent],
  templateUrl: './market-card.component.html',
  styleUrl: './market-card.component.scss',
})
export class MarketCardComponent {
  readonly data = input.required<MarketCardData>();

  protected readonly tone = computed<'positive' | 'negative' | 'neutral'>(() => {
    const c = this.data().changePct;
    if (c > 0.01) return 'positive';
    if (c < -0.01) return 'negative';
    return 'neutral';
  });

  protected readonly formattedPrice = computed<string>(() => {
    const d = this.data();
    const precision = d.precision ?? 2;
    return d.price.toLocaleString('en-US', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  });

  protected readonly formattedChange = computed<string>(() => {
    const d = this.data();
    const sign = d.changeAbs > 0 ? '+' : d.changeAbs < 0 ? '−' : '';
    const abs = Math.abs(d.changeAbs).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${sign}${abs}`;
  });

  protected readonly formattedPct = computed<string>(() => {
    const d = this.data();
    const sign = d.changePct > 0 ? '+' : d.changePct < 0 ? '−' : '';
    return `${sign}${Math.abs(d.changePct).toFixed(2)}%`;
  });
}
