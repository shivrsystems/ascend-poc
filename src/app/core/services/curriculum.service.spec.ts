import { TestBed } from '@angular/core/testing';
import { CurriculumService } from './curriculum.service';
import { OrganizationService } from './organization.service';

describe('CurriculumService', () => {
  let service: CurriculumService;
  let orgService: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumService);
    orgService = TestBed.inject(OrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 10 curricula for default org', () => {
    expect(service.curricula().length).toBe(10);
  });

  it('should have valid statuses', () => {
    service.curricula().forEach(c => {
      expect(['PUBLISHED', 'DRAFT']).toContain(c.status);
    });
  });

  it('should have positive study options', () => {
    service.curricula().forEach(c => {
      expect(c.studyOptions).toBeGreaterThan(0);
    });
  });

  it('should have created dates', () => {
    service.curricula().forEach(c => {
      expect(c.createdDate.length).toBeGreaterThan(0);
    });
  });

  it('should have last updated dates', () => {
    service.curricula().forEach(c => {
      expect(c.lastUpdated.length).toBeGreaterThan(0);
    });
  });

  it('should update curricula when org changes to org-2', () => {
    orgService.selectOrganization('org-2');
    expect(service.curricula().length).toBe(5);
  });

  it('should update curricula when org changes to org-3', () => {
    orgService.selectOrganization('org-3');
    expect(service.curricula().length).toBe(4);
  });

  it('should have both published and draft for default org', () => {
    const statuses = new Set(service.curricula().map(c => c.status));
    expect(statuses.has('PUBLISHED')).toBe(true);
    expect(statuses.has('DRAFT')).toBe(true);
  });

  it('should have unique ids', () => {
    const ids = service.curricula().map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should have names for all curricula', () => {
    service.curricula().forEach(c => {
      expect(c.name.length).toBeGreaterThan(0);
    });
  });

  it('should fallback to org-1 for invalid org', () => {
    orgService.selectOrganization('invalid');
    expect(service.curricula().length).toBe(10);
  });

  it('should have first curriculum as Latest Curriculum', () => {
    expect(service.curricula()[0].name).toContain('Latest Curriculum');
  });
});
