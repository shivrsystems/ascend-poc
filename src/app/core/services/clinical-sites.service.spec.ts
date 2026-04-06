import { TestBed } from '@angular/core/testing';
import { ClinicalSitesService } from './clinical-sites.service';
import { OrganizationService } from './organization.service';

describe('ClinicalSitesService', () => {
  let service: ClinicalSitesService;
  let orgService: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicalSitesService);
    orgService = TestBed.inject(OrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 14 sites for default org', () => {
    expect(service.sites().length).toBe(14);
  });

  it('should have Boston Medical Center as first site', () => {
    expect(service.sites()[0].name).toBe('Boston Medical Center');
  });

  it('should have sites with valid statuses', () => {
    service.sites().forEach(site => {
      expect(['ACTIVE', 'INACTIVE', 'BALANCED']).toContain(site.status);
    });
  });

  it('should have sites with non-negative student counts', () => {
    service.sites().forEach(site => {
      expect(site.students).toBeGreaterThanOrEqual(0);
    });
  });

  it('should have sites with non-negative course counts', () => {
    service.sites().forEach(site => {
      expect(site.courses).toBeGreaterThanOrEqual(0);
    });
  });

  it('should update sites when org changes to org-2', () => {
    orgService.selectOrganization('org-2');
    expect(service.sites().length).toBe(6);
    expect(service.sites()[0].name).toBe('Arlington Memorial Hospital');
  });

  it('should update sites when org changes to org-3', () => {
    orgService.selectOrganization('org-3');
    expect(service.sites().length).toBe(5);
  });

  it('should have alert tags on some sites', () => {
    const sitesWithAlerts = service.sites().filter(s => s.alertTag);
    expect(sitesWithAlerts.length).toBeGreaterThan(0);
  });

  it('should have valid alert types', () => {
    service.sites().filter(s => s.alertType).forEach(site => {
      expect(['warning', 'info']).toContain(site.alertType);
    });
  });

  it('should have inactive sites with 0 students', () => {
    const inactive = service.sites().filter(s => s.status === 'INACTIVE');
    inactive.forEach(site => {
      expect(site.students).toBe(0);
    });
  });

  it('should fallback to org-1 for invalid org', () => {
    orgService.selectOrganization('invalid');
    expect(service.sites().length).toBe(14);
  });

  it('should have location for all sites', () => {
    service.sites().forEach(site => {
      expect(site.location.length).toBeGreaterThan(0);
    });
  });
});
