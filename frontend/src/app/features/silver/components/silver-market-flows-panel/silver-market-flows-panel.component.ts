import { Component, inject } from '@angular/core';
import { IntelligencePanelComponent } from '../../../../shared/intelligence-panel/intelligence-panel.component';
import { SilverDataService } from '../../services/silver-data.service';

const VISIBLE = 4;

@Component({
  selector: 'app-silver-market-flows-panel',
  standalone: true,
  imports: [IntelligencePanelComponent],
  templateUrl: './silver-market-flows-panel.component.html',
  styleUrl: './silver-market-flows-panel.component.scss',
})
export class SilverMarketFlowsPanelComponent {
  private readonly data = inject(SilverDataService);

  protected readonly visibleRows = this.data.marketFlows.slice(0, VISIBLE);
  protected readonly hiddenCount = Math.max(0, this.data.marketFlows.length - VISIBLE);
}
