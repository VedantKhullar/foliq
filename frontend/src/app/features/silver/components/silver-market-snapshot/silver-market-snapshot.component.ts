import { Component, inject } from '@angular/core';
import { MarketCardComponent } from '../../../../shared/market-card/market-card.component';
import { SilverDataService } from '../../services/silver-data.service';

@Component({
  selector: 'app-silver-market-snapshot',
  standalone: true,
  imports: [MarketCardComponent],
  templateUrl: './silver-market-snapshot.component.html',
  styleUrl: './silver-market-snapshot.component.scss',
})
export class SilverMarketSnapshotComponent {
  private readonly data = inject(SilverDataService);
  protected readonly cards = this.data.snapshotCards;
}
