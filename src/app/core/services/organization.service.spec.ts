import { TestBed } from '@angular/core/testing';
import { OrganizationService } from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default organization as McNeese State University', () => {
    expect(service.currentOrg().name).toBe('McNeese State University');
  });

  it('should have org-1 as default current org id', () => {
    expect(service.currentOrgId()).toBe('org-1');
  });

  it('should return all organizations', () => {
    expect(service.allOrganizations().length).toBe(3);
  });

  it('should contain McNeese, UTA, and FAU', () => {
    const names = service.allOrganizations().map(o => o.shortName);
    expect(names).toContain('McNeese');
    expect(names).toContain('UTA');
    expect(names).toContain('FAU');
  });

  it('should switch organization when selectOrganization is called', () => {
    service.selectOrganization('org-2');
    expect(service.currentOrgId()).toBe('org-2');
    expect(service.currentOrg().name).toBe('University of Texas at Arlington');
  });

  it('should switch to FAU', () => {
    service.selectOrganization('org-3');
    expect(service.currentOrg().shortName).toBe('FAU');
  });

  it('should fallback to first org for invalid id', () => {
    service.selectOrganization('invalid-id');
    expect(service.currentOrg().name).toBe('McNeese State University');
  });

  it('should have unique ids for all organizations', () => {
    const ids = service.allOrganizations().map(o => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should update currentOrg when switching back to original', () => {
    service.selectOrganization('org-2');
    expect(service.currentOrg().id).toBe('org-2');
    service.selectOrganization('org-1');
    expect(service.currentOrg().id).toBe('org-1');
  });

  it('should have valid shortNames for all orgs', () => {
    service.allOrganizations().forEach(org => {
      expect(org.shortName.length).toBeGreaterThan(0);
    });
  });

  it('should have valid names for all orgs', () => {
    service.allOrganizations().forEach(org => {
      expect(org.name.length).toBeGreaterThan(0);
    });
  });
});
