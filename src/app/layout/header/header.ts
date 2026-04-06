import { Component, input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { OrganizationService } from '../../core/services/organization.service';
import { AuthService } from '../../core/services/auth.service';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatBadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');

  readonly orgService = inject(OrganizationService);
  readonly authService = inject(AuthService);
  readonly sidebarService = inject(SidebarService);

  selectOrg(orgId: string): void {
    this.orgService.selectOrganization(orgId);
  }

  toggleMobileMenu(): void {
    this.sidebarService.toggleMobile();
  }
}
