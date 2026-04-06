import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CurriculumComponent } from './curriculum';
import { OrganizationService } from '../../core/services/organization.service';

describe('CurriculumComponent', () => {
  let component: CurriculumComponent;
  let orgService: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CurriculumComponent, RouterTestingModule.withRoutes([])],
    });
    component = TestBed.createComponent(CurriculumComponent).componentInstance;
    orgService = TestBed.inject(OrganizationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all as default filter', () => {
    expect(component.activeFilter()).toBe('all');
  });

  it('should have empty search query initially', () => {
    expect(component.searchQuery()).toBe('');
  });

  it('should return all curricula when filter is all', () => {
    expect(component.filteredCurricula().length).toBe(10);
  });

  it('should filter published curricula', () => {
    component.setFilter('published');
    component.filteredCurricula().forEach(c => {
      expect(c.status).toBe('PUBLISHED');
    });
  });

  it('should filter draft curricula', () => {
    component.setFilter('draft');
    component.filteredCurricula().forEach(c => {
      expect(c.status).toBe('DRAFT');
    });
  });

  it('should filter by search query', () => {
    component.searchQuery.set('Data Science');
    const results = component.filteredCurricula();
    expect(results.length).toBeGreaterThan(0);
    results.forEach(c => {
      expect(c.name.toLowerCase()).toContain('data science');
    });
  });

  it('should combine filter and search', () => {
    component.setFilter('published');
    component.searchQuery.set('AI Ethics');
    const results = component.filteredCurricula();
    expect(results.length).toBe(1);
    expect(results[0].status).toBe('PUBLISHED');
  });

  it('should show hasResults as true when results exist', () => {
    expect(component.hasResults()).toBe(true);
  });

  it('should show hasResults as false for non-matching search', () => {
    component.searchQuery.set('zzznomatch');
    expect(component.hasResults()).toBe(false);
  });

  it('should clear search', () => {
    component.searchQuery.set('something');
    component.clearSearch();
    expect(component.searchQuery()).toBe('');
  });

  it('should explore filter changes filter and clears search', () => {
    component.searchQuery.set('something');
    component.exploreFilter('published');
    expect(component.searchQuery()).toBe('');
    expect(component.activeFilter()).toBe('published');
  });

  it('should update curricula when org changes', () => {
    orgService.selectOrganization('org-2');
    component.setFilter('all');
    expect(component.filteredCurricula().length).toBe(5);
  });

  it('should have draft curricula for default org', () => {
    component.setFilter('draft');
    expect(component.filteredCurricula().length).toBe(2);
  });
});
