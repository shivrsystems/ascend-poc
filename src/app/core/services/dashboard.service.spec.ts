import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { OrganizationService } from './organization.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let orgService: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
    orgService = TestBed.inject(OrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return stats for default org', () => {
    const stats = service.stats();
    expect(stats.totalStudents).toBe(65);
    expect(stats.totalSites).toBe(14);
  });

  it('should return 15 reports for default org', () => {
    expect(service.reports().length).toBe(15);
  });

  it('should return 5 quick actions', () => {
    expect(service.quickActions().length).toBe(5);
  });

  it('should return activities for default org', () => {
    expect(service.activities().length).toBeGreaterThan(0);
  });

  it('should update stats when org changes to org-2', () => {
    orgService.selectOrganization('org-2');
    const stats = service.stats();
    expect(stats.totalStudents).toBe(120);
    expect(stats.totalSites).toBe(22);
  });

  it('should update reports when org changes', () => {
    orgService.selectOrganization('org-2');
    expect(service.reports().length).toBe(9);
  });

  it('should update activities when org changes', () => {
    orgService.selectOrganization('org-2');
    const activities = service.activities();
    expect(activities.length).toBe(5);
  });

  it('should have valid report statuses', () => {
    service.reports().forEach(report => {
      expect(['COMPLETED', 'UNDER REVIEW']).toContain(report.status);
    });
  });

  it('should have quick actions with icons', () => {
    service.quickActions().forEach(action => {
      expect(action.icon.length).toBeGreaterThan(0);
      expect(action.label.length).toBeGreaterThan(0);
    });
  });

  it('should have activities with valid colors', () => {
    service.activities().forEach(activity => {
      expect(['green', 'blue', 'amber', 'red']).toContain(activity.color);
    });
  });

  it('should return stats for org-3', () => {
    orgService.selectOrganization('org-3');
    expect(service.stats().totalStudents).toBe(89);
  });

  it('should fallback to org-1 data for invalid org', () => {
    orgService.selectOrganization('invalid');
    expect(service.stats().totalStudents).toBe(65);
  });
});
