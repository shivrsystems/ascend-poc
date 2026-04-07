import { Component, inject, signal, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from '../../layout/header/header';
import { DashboardService } from '../../core/services/dashboard.service';
import { Report } from '../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, MatTabsModule, HeaderComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  readonly Math = Math;
  readonly dashboardService = inject(DashboardService);

  readonly activeTab = signal<'sep' | 'evaluation'>('sep');
  readonly currentPage = signal(1);
  readonly pageSize = 9;

  readonly stats = computed(() => {
    const s = this.dashboardService.stats();
    return [
      { label: 'Total Students', value: s.totalStudents, change: s.newStudentsThisMonth },
      { label: 'Total Sites', value: s.totalSites, change: s.newSitesThisMonth },
      { label: 'Total Courses', value: s.totalCourses, change: s.newCoursesThisMonth },
      {
        label: 'Scheduled Evaluations',
        value: s.scheduledEvaluations.toLocaleString(),
        change: s.newEvaluationsThisMonth,
      },
    ];
  });

  readonly paginatedReports = computed(() => {
    const reports = this.dashboardService.reports();
    const start = (this.currentPage() - 1) * this.pageSize;
    return reports.slice(start, start + this.pageSize);
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.dashboardService.reports().length / this.pageSize),
  );

  readonly totalReports = computed(() => this.dashboardService.reports().length);

  setTab(tab: 'sep' | 'evaluation'): void {
    this.activeTab.set(tab);
    this.currentPage.set(1);
  }

  setPage(page: number): void {
    this.currentPage.set(page);
  }

  getActivityColor(color: string): string {
    const colors: Record<string, string> = {
      green: '#0F9255',
      blue: '#1F72D0',
      amber: '#CA8D1B',
      red: '#D92D21',
    };
    return colors[color] ?? '#0F9255';
  }
}
