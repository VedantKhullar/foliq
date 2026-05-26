import { Component, input, output } from '@angular/core';

export interface SegmentOption<TValue extends string = string> {
  value: TValue;
  label: string;
}

@Component({
  selector: 'app-segmented-control',
  standalone: true,
  templateUrl: './segmented-control.component.html',
  styleUrl: './segmented-control.component.scss',
})
export class SegmentedControlComponent<TValue extends string = string> {
  readonly options = input.required<ReadonlyArray<SegmentOption<TValue>>>();
  readonly value = input.required<TValue>();
  readonly label = input<string | undefined>(undefined);
  readonly size = input<'sm' | 'md'>('sm');

  readonly valueChange = output<TValue>();

  protected select(option: SegmentOption<TValue>): void {
    if (option.value === this.value()) return;
    this.valueChange.emit(option.value);
  }
}
