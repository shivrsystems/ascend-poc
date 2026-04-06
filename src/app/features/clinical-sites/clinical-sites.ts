import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from '../../layout/header/header';
import { ClinicalSitesService } from '../../core/services/clinical-sites.service';
import { ClinicalSite } from '../../core/models/clinical-site.model';

type FilterType = 'all' | 'active' | 'balanced';

interface BarChartItem {
  label: string;
  value: number;
  percent: number;
  color: string;
}

interface AttentionItem {
  dotColor: string;
  count: number;
  title: string;
  detailNames: string;
  detailSuffix: string;
}

interface CourseData {
  name: string;
  count: number;
}

@Component({
  selector: 'app-clinical-sites',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatButtonModule, MatMenuModule, HeaderComponent],
  templateUrl: './clinical-sites.html',
  styleUrl: './clinical-sites.scss',
})
export class ClinicalSitesComponent {
  private readonly clinicalSitesService = inject(ClinicalSitesService);

  readonly activeFilter = signal<FilterType>('all');
  readonly searchQuery = signal('');
  readonly showInsights = signal(false);

  readonly filterLabel = computed(() => {
    const labels: Record<FilterType, string> = { all: 'All', active: 'Active', balanced: 'Balanced' };
    return labels[this.activeFilter()];
  });

  readonly filteredSites = computed(() => {
    let sites = this.clinicalSitesService.sites();
    const filter = this.activeFilter();
    const query = this.searchQuery().toLowerCase().trim();

    if (filter === 'active') {
      sites = sites.filter(s => s.status === 'ACTIVE');
    } else if (filter === 'balanced') {
      sites = sites.filter(s => s.status === 'BALANCED');
    }

    if (query) {
      sites = sites.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.location.toLowerCase().includes(query)
      );
    }

    return sites;
  });

  readonly statusDistribution = computed(() => {
    const sites = this.clinicalSitesService.sites();
    const active = sites.filter(s => s.status === 'ACTIVE').length;
    const inactive = sites.filter(s => s.status !== 'ACTIVE').length;
    return { active, inactive, total: sites.length };
  });

  readonly topStudentsBySite = computed<BarChartItem[]>(() => {
    const sites = [...this.clinicalSitesService.sites()]
      .sort((a, b) => b.students - a.students)
      .slice(0, 5);
    const max = sites[0]?.students || 1;
    return sites.map(s => ({
      label: s.name,
      value: s.students,
      percent: (s.students / max) * 100,
      color: '#1F72D0',
    }));
  });

  readonly topCourses = computed<BarChartItem[]>(() => {
    const courses: CourseData[] = [
      { name: 'Anatomy 101', count: 56 },
      { name: 'Physiology 201', count: 51 },
      { name: 'Surgery 301', count: 42 },
      { name: 'Pediatrics 401', count: 32 },
      { name: 'Neurology 501', count: 32 },
    ];
    const max = courses[0].count;
    return courses.map(c => ({
      label: c.name,
      value: c.count,
      percent: (c.count / max) * 100,
      color: '#DB5B24',
    }));
  });

  readonly topSitesByLocation = computed<BarChartItem[]>(() => {
    const sites = this.clinicalSitesService.sites();
    const locationMap = new Map<string, number>();
    sites.forEach(s => {
      locationMap.set(s.location, (locationMap.get(s.location) || 0) + 1);
    });
    const sorted = [...locationMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const max = sorted[0]?.[1] || 1;
    return sorted.map(([loc, val]) => ({
      label: loc,
      value: val,
      percent: (val / max) * 100,
      color: '#CA8D1B',
    }));
  });

  readonly needsAttention = computed<AttentionItem[]>(() => {
    const sites = this.clinicalSitesService.sites();
    const items: AttentionItem[] = [];

    const inactive = sites.filter(s => s.status === 'INACTIVE');
    if (inactive.length > 0) {
      items.push({
        dotColor: '#CA8D1B',
        count: inactive.length,
        title: `site${inactive.length > 1 ? 's' : ''} inactive`,
        detailNames: inactive.map(s => s.name).join(', '),
        detailSuffix: ' has not reported activity',
      });
    }

    const lowActivity = sites.filter(s => s.alertType === 'info');
    if (lowActivity.length > 0) {
      items.push({
        dotColor: '#1F72D0',
        count: lowActivity.length,
        title: `site${lowActivity.length > 1 ? 's' : ''} underutilized`,
        detailNames: lowActivity.map(s => s.name).join(', '),
        detailSuffix: ' has low student activity',
      });
    }

    const highLoad = sites.filter(s => s.alertType === 'warning');
    const chunkSize = 2;
    for (let i = 0; i < highLoad.length; i += chunkSize) {
      const chunk = highLoad.slice(i, i + chunkSize);
      items.push({
        dotColor: '#CA8D1B',
        count: chunk.length,
        title: `site${chunk.length > 1 ? 's' : ''} with high student load`,
        detailNames: chunk.map(s => s.name).join(', '),
        detailSuffix: '',
      });
    }

    return items;
  });

  toggleInsights(): void {
    this.showInsights.update(v => !v);
  }

  setFilter(filter: FilterType): void {
    this.activeFilter.set(filter);
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  getAlertClass(alertType?: string): string {
    return alertType === 'warning' ? 'alert-warning' : 'alert-info';
  }

  getDonutGradient(): string {
    const d = this.statusDistribution();
    const total = d.total || 1;
    const activePct = (d.active / total) * 100;
    return `conic-gradient(#12B76A 0% ${activePct}%, #F97066 ${activePct}% 100%)`;
  }

  formatNumber(value: number): string {
    return value.toLocaleString();
  }
}
