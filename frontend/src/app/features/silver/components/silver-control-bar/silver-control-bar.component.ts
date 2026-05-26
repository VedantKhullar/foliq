import { Component, inject } from '@angular/core';
import {
  SegmentOption,
  SegmentedControlComponent,
} from '../../../../shared/segmented-control/segmented-control.component';
import { SilverDataService } from '../../services/silver-data.service';
import { SilverCurrency, SilverExchange } from '../../models/silver-market.model';

@Component({
  selector: 'app-silver-control-bar',
  standalone: true,
  imports: [SegmentedControlComponent],
  templateUrl: './silver-control-bar.component.html',
  styleUrl: './silver-control-bar.component.scss',
})
export class SilverControlBarComponent {
  private readonly data = inject(SilverDataService);

  protected readonly exchange = this.data.exchange;
  protected readonly currency = this.data.currency;

  protected readonly exchangeOptions: ReadonlyArray<SegmentOption<SilverExchange>> = [
    { value: 'mcx', label: 'MCX' },
    { value: 'comex', label: 'COMEX' },
    { value: 'spot', label: 'Spot' },
  ];

  protected readonly currencyOptions: ReadonlyArray<SegmentOption<SilverCurrency>> = [
    { value: 'inr', label: 'INR' },
    { value: 'usd', label: 'USD' },
  ];

  protected onExchangeChange(value: SilverExchange): void {
    this.data.setExchange(value);
  }

  protected onCurrencyChange(value: SilverCurrency): void {
    this.data.setCurrency(value);
  }
}
