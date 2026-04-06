import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from '../../layout/header/header';
import { CurriculumService } from '../../core/services/curriculum.service';

type CurriculumFilter = 'all' | 'published' | 'draft';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatMenuModule, HeaderComponent],
  templateUrl: './curriculum.html',
  styleUrl: './curriculum.scss',
})
export class CurriculumComponent {
  private readonly curriculumService = inject(CurriculumService);

  readonly activeFilter = signal<CurriculumFilter>('all');
  readonly searchQuery = signal('');

  readonly filterLabel = computed(() => {
    const labels: Record<CurriculumFilter, string> = { all: 'All', published: 'Published', draft: 'Draft' };
    return labels[this.activeFilter()];
  });

  readonly filteredCurricula = computed(() => {
    let items = this.curriculumService.curricula();
    const filter = this.activeFilter();
    const query = this.searchQuery().toLowerCase().trim();

    if (filter === 'published') {
      items = items.filter(c => c.status === 'PUBLISHED');
    } else if (filter === 'draft') {
      items = items.filter(c => c.status === 'DRAFT');
    }

    if (query) {
      items = items.filter(c => c.name.toLowerCase().includes(query));
    }

    return items;
  });

  readonly hasResults = computed(() => this.filteredCurricula().length > 0);

  setFilter(filter: CurriculumFilter): void {
    this.activeFilter.set(filter);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  exploreFilter(filter: CurriculumFilter): void {
    this.searchQuery.set('');
    this.activeFilter.set(filter);
  }
}
