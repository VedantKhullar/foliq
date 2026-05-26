import { Component, signal } from '@angular/core';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected readonly activeItem = signal<string>('silver');

  protected readonly primaryNav: ReadonlyArray<NavItem> = [
    { id: 'silver', label: 'Silver', icon: 'silver' },
    { id: 'gold', label: 'Gold', icon: 'gold', disabled: true },
    // { id: 'stocks', label: 'Stocks', icon: 'stocks', disabled: true },
    // { id: 'macro', label: 'Macro', icon: 'macro', disabled: true },
    // { id: 'signals', label: 'Signals', icon: 'signals', disabled: true },
    // { id: 'events', label: 'Events', icon: 'events', disabled: true },
    // { id: 'watchlists', label: 'Watchlists', icon: 'watchlists', disabled: true },
  ];

  protected readonly bottomNav: ReadonlyArray<NavItem> = [
    { id: 'settings', label: 'Settings', icon: 'settings', disabled: true },
  ];

  protected select(item: NavItem): void {
    if (item.disabled) return;
    this.activeItem.set(item.id);
  }
}
