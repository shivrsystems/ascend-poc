import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClinicalSitesComponent } from './clinical-sites';
import { OrganizationService } from '../../core/services/organization.service';

describe('ClinicalSitesComponent', () => {
  let component: ClinicalSitesComponent;
  let orgService: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClinicalSitesComponent, RouterTestingModule.withRoutes([])],
    });
    component = TestBed.createComponent(ClinicalSitesComponent).componentInstance;
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

  it('should return all sites when filter is all', () => {
    expect(component.filteredSites().length).toBe(14);
  });

  it('should filter active sites', () => {
    component.setFilter('active');
    const sites = component.filteredSites();
    sites.forEach(s => expect(s.status).toBe('ACTIVE'));
  });

  it('should filter balanced sites', () => {
    component.setFilter('balanced');
    const sites = component.filteredSites();
    sites.forEach(s => expect(s.status).toBe('BALANCED'));
  });

  it('should filter by search query', () => {
    component.searchQuery.set('Boston');
    const sites = component.filteredSites();
    sites.forEach(s => {
      expect(
        s.name.toLowerCase().includes('boston') ||
          s.location.toLowerCase().includes('boston')
      ).toBe(true);
    });
  });

  it('should combine filter and search', () => {
    component.setFilter('active');
    component.searchQuery.set('Toronto');
    const sites = component.filteredSites();
    expect(sites.length).toBeGreaterThan(0);
    sites.forEach(s => {
      expect(s.status).toBe('ACTIVE');
      expect(s.name.toLowerCase()).toContain('toronto');
    });
  });

  it('should return empty for non-matching search', () => {
    component.searchQuery.set('zzznomatch');
    expect(component.filteredSites().length).toBe(0);
  });

  it('should update sites when org changes', () => {
    orgService.selectOrganization('org-2');
    component.setFilter('all');
    expect(component.filteredSites().length).toBe(6);
  });

  it('should return correct status class', () => {
    expect(component.getStatusClass('ACTIVE')).toBe('active');
    expect(component.getStatusClass('INACTIVE')).toBe('inactive');
  });

  it('should return correct alert class for warning', () => {
    expect(component.getAlertClass('warning')).toBe('alert-warning');
  });

  it('should return correct alert class for info', () => {
    expect(component.getAlertClass('info')).toBe('alert-info');
  });
});
