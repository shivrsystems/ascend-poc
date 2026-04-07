import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarService } from '../../core/services/sidebar.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatTooltipModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  readonly sidebarService = inject(SidebarService);
  readonly isExpanded = this.sidebarService.isExpanded;
  readonly mobileOpen = this.sidebarService.mobileOpen;

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'grid_view', route: '/dashboard' },
    { label: 'Clinical Sites', icon: 'location_on', route: '/clinical-sites' },
    { label: 'Curriculum Management', icon: 'folder_copy', route: '/curriculum' },
    // { label: 'Documents', icon: 'description', route: '/documents' },
    // { label: 'Assessments', icon: 'checklist', route: '/assessments' },
    // { label: 'Modules', icon: 'view_module', route: '/modules' },
    // { label: 'Calendar', icon: 'calendar_today', route: '/calendar' },
    // { label: 'Compliance', icon: 'gavel', route: '/compliance' },
    // { label: 'Settings', icon: 'settings', route: '/settings' },
  ];

  toggle(): void {
    this.sidebarService.toggle();
  }

  onMouseEnter(): void {
    this.sidebarService.hoverOpen();
  }

  onMobileNavClick(): void {
    this.sidebarService.closeMobile();
  }

  closeMobileOverlay(): void {
    this.sidebarService.closeMobile();
  }
}
