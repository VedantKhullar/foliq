import { Component } from '@angular/core';
import { SilverControlBarComponent } from '../../components/silver-control-bar/silver-control-bar.component';
import { SilverMarketSnapshotComponent } from '../../components/silver-market-snapshot/silver-market-snapshot.component';
import { SilverComparisonChartComponent } from '../../components/silver-comparison-chart/silver-comparison-chart.component';
import { SilverMarketFlowsPanelComponent } from '../../components/silver-market-flows-panel/silver-market-flows-panel.component';
import { SilverPolicyFeedPanelComponent } from '../../components/silver-policy-feed-panel/silver-policy-feed-panel.component';
import { SilverAiInsightsPanelComponent } from '../../components/silver-ai-insights-panel/silver-ai-insights-panel.component';
import { SilverEtfFlowsPanelComponent } from '../../components/silver-etf-flows-panel/silver-etf-flows-panel.component';
import { SilverEventsCalendarPanelComponent } from '../../components/silver-events-calendar-panel/silver-events-calendar-panel.component';
import { SilverDriversPanelComponent } from '../../components/silver-drivers-panel/silver-drivers-panel.component';

@Component({
  selector: 'app-silver-dashboard-page',
  standalone: true,
  imports: [
    SilverControlBarComponent,
    SilverMarketSnapshotComponent,
    SilverComparisonChartComponent,
    SilverMarketFlowsPanelComponent,
    SilverPolicyFeedPanelComponent,
    SilverAiInsightsPanelComponent,
    SilverEtfFlowsPanelComponent,
    SilverEventsCalendarPanelComponent,
    SilverDriversPanelComponent,
  ],
  templateUrl: './silver-dashboard-page.component.html',
  styleUrl: './silver-dashboard-page.component.scss',
})
export class SilverDashboardPageComponent {}
