import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  readonly isExpanded = signal(false);
  readonly mobileOpen = signal(false);

  toggle(): void {
    this.isExpanded.update(v => !v);
  }

  hoverOpen(): void {
    if (!this.isExpanded()) {
      this.isExpanded.set(true);
    }
  }

  openMobile(): void {
    this.mobileOpen.set(true);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }
}
