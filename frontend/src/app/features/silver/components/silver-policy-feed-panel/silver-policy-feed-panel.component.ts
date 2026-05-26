import { Component, inject } from '@angular/core';
import { IntelligencePanelComponent } from '../../../../shared/intelligence-panel/intelligence-panel.component';
import { SilverDataService } from '../../services/silver-data.service';

const VISIBLE = 3;

@Component({
  selector: 'app-silver-policy-feed-panel',
  standalone: true,
  imports: [IntelligencePanelComponent],
  templateUrl: './silver-policy-feed-panel.component.html',
  styleUrl: './silver-policy-feed-panel.component.scss',
})
export class SilverPolicyFeedPanelComponent {
  private readonly data = inject(SilverDataService);

  protected readonly visibleItems = this.data.policyUpdates.slice(0, VISIBLE);
  protected readonly hiddenCount = Math.max(0, this.data.policyUpdates.length - VISIBLE);
}
