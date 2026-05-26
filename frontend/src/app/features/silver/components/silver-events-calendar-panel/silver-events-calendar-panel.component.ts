import { Component, inject } from '@angular/core';
import { IntelligencePanelComponent } from '../../../../shared/intelligence-panel/intelligence-panel.component';
import { SilverDataService } from '../../services/silver-data.service';

const VISIBLE = 4;

@Component({
  selector: 'app-silver-events-calendar-panel',
  standalone: true,
  imports: [IntelligencePanelComponent],
  templateUrl: './silver-events-calendar-panel.component.html',
  styleUrl: './silver-events-calendar-panel.component.scss',
})
export class SilverEventsCalendarPanelComponent {
  private readonly data = inject(SilverDataService);

  protected readonly visibleEvents = this.data.calendarEvents.slice(0, VISIBLE);
  protected readonly hiddenCount = Math.max(0, this.data.calendarEvents.length - VISIBLE);
}
