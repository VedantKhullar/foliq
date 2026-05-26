import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-sparkline',
  standalone: true,
  templateUrl: './sparkline.component.html',
  styleUrl: './sparkline.component.scss',
})
export class SparklineComponent {
  readonly values = input.required<ReadonlyArray<number>>();
  readonly tone = input<'positive' | 'negative' | 'neutral'>('neutral');
  readonly width = input<number>(96);
  readonly height = input<number>(28);

  protected readonly viewBox = computed(() => `0 0 ${this.width()} ${this.height()}`);

  protected readonly path = computed<string>(() => {
    const vals = this.values();
    if (!vals.length) return '';
    const w = this.width();
    const h = this.height();
    const padding = 2;
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;
    const step = (w - padding * 2) / Math.max(1, vals.length - 1);
    return vals
      .map((v, i) => {
        const x = padding + i * step;
        const y = padding + (h - padding * 2) * (1 - (v - min) / range);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ');
  });

  protected readonly area = computed<string>(() => {
    const vals = this.values();
    if (!vals.length) return '';
    const w = this.width();
    const h = this.height();
    const padding = 2;
    return `${this.path()} L ${w - padding} ${h - padding} L ${padding} ${h - padding} Z`;
  });

  protected readonly stroke = computed<string>(() => {
    switch (this.tone()) {
      case 'positive':
        return 'var(--positive)';
      case 'negative':
        return 'var(--negative)';
      default:
        return 'var(--accent-silver)';
    }
  });

  protected readonly fill = computed<string>(() => {
    switch (this.tone()) {
      case 'positive':
        return 'var(--positive-soft)';
      case 'negative':
        return 'var(--negative-soft)';
      default:
        return 'rgba(201, 205, 211, 0.08)';
    }
  });
}
