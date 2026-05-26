import { Component, inject } from '@angular/core';
import { IntelligencePanelComponent } from '../../../../shared/intelligence-panel/intelligence-panel.component';
import { SparklineComponent } from '../../../../shared/sparkline/sparkline.component';
import { SilverDataService } from '../../services/silver-data.service';

@Component({
  selector: 'app-silver-drivers-panel',
  standalone: true,
  imports: [IntelligencePanelComponent, SparklineComponent],
  templateUrl: './silver-drivers-panel.component.html',
  styleUrl: './silver-drivers-panel.component.scss',
})
export class SilverDriversPanelComponent {
  private readonly data = inject(SilverDataService);
  protected readonly drivers = this.data.drivers;

  protected tone(stance: 'supportive' | 'pressuring' | 'mixed'): 'positive' | 'negative' | 'neutral' {
    switch (stance) {
      case 'supportive':
        return 'positive';
      case 'pressuring':
        return 'negative';
      default:
        return 'neutral';
    }
  }
}
