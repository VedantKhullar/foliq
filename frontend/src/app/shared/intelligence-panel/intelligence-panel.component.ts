import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-intelligence-panel',
  standalone: true,
  templateUrl: './intelligence-panel.component.html',
  styleUrl: './intelligence-panel.component.scss',
})
export class IntelligencePanelComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string | undefined>(undefined);
  readonly badge = input<string | undefined>(undefined);

  /** When set, a footer with a "load more" button is rendered. */
  readonly footerLabel = input<string | undefined>(undefined);

  /** Optional count badge shown next to the footer label. */
  readonly footerCount = input<number | undefined>(undefined);

  /** Hint to the load-more button, e.g. "Open full feed →". Non-functional for now. */
  readonly loadMore = output<void>();

  protected onLoadMore(): void {
    this.loadMore.emit();
  }
}
