import { Component, inject } from '@angular/core';
import { IntelligencePanelComponent } from '../../../../shared/intelligence-panel/intelligence-panel.component';
import { SilverDataService } from '../../services/silver-data.service';

const VISIBLE = 3;

@Component({
  selector: 'app-silver-ai-insights-panel',
  standalone: true,
  imports: [IntelligencePanelComponent],
  templateUrl: './silver-ai-insights-panel.component.html',
  styleUrl: './silver-ai-insights-panel.component.scss',
})
export class SilverAiInsightsPanelComponent {
  private readonly data = inject(SilverDataService);

  protected readonly visibleInsights = this.data.aiInsights.slice(0, VISIBLE);
  protected readonly hiddenCount = Math.max(0, this.data.aiInsights.length - VISIBLE);
}
