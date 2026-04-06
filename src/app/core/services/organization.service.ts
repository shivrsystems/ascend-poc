import { Injectable, signal, computed } from '@angular/core';
import { Organization } from '../models/organization.model';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private readonly organizations = signal<Organization[]>([
    { id: 'org-1', name: 'McNeese State University', shortName: 'McNeese' },
    { id: 'org-2', name: 'University of Texas at Arlington', shortName: 'UTA' },
    { id: 'org-3', name: 'Florida Atlantic University', shortName: 'FAU' },
  ]);

  readonly currentOrgId = signal('org-1');

  readonly currentOrg = computed(() =>
    this.organizations().find(o => o.id === this.currentOrgId()) ?? this.organizations()[0]
  );

  readonly allOrganizations = computed(() => this.organizations());

  selectOrganization(orgId: string): void {
    this.currentOrgId.set(orgId);
  }
}
