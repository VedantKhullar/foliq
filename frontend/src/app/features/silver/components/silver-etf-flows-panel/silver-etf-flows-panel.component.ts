import { Component, computed, inject } from '@angular/core';
import { IntelligencePanelComponent } from '../../../../shared/intelligence-panel/intelligence-panel.component';
import { SilverDataService } from '../../services/silver-data.service';

const VISIBLE = 4;

@Component({
  selector: 'app-silver-etf-flows-panel',
  standalone: true,
  imports: [IntelligencePanelComponent],
  templateUrl: './silver-etf-flows-panel.component.html',
  styleUrl: './silver-etf-flows-panel.component.scss',
})
export class SilverEtfFlowsPanelComponent {
  private readonly data = inject(SilverDataService);

  protected readonly visibleRows = this.data.etfFlows.slice(0, VISIBLE);
  protected readonly hiddenCount = Math.max(0, this.data.etfFlows.length - VISIBLE);

  protected readonly maxAbsFlow = computed<number>(() => {
    return Math.max(...this.visibleRows.map((r) => Math.abs(r.flow)));
  });

  protected barWidthPct(flow: number): number {
    const max = this.maxAbsFlow();
    if (!max) return 0;
    return Math.min(100, (Math.abs(flow) / max) * 100);
  }
}
