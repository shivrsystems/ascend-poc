import { Injectable, inject, computed } from '@angular/core';
import { OrganizationService } from './organization.service';
import { ClinicalSite } from '../models/clinical-site.model';

const MOCK_SITES: Record<string, ClinicalSite[]> = {
  'org-1': [
    { id: 's1', name: 'Boston Medical Center', location: 'Boston, MA', status: 'ACTIVE', alertTag: 'High student load', alertType: 'warning', students: 1891, courses: 56, units: ['ICU', 'ER', 'Pediatrics'] },
    { id: 's2', name: 'Central Hospital', location: 'Boston, MA', status: 'INACTIVE', students: 1109, courses: 51 },
    { id: 's3', name: 'A1 Clinical Site', location: 'San Diego, CA', status: 'BALANCED', students: 871, courses: 42 },
    { id: 's4', name: 'Automation Clinical Site', location: 'New York, NY', status: 'ACTIVE', alertTag: 'Low activity', alertType: 'info', students: 651, courses: 32, units: ['Med-Surg'] },
    { id: 's5', name: 'Toronto General Hospital', location: 'Boston, MA', status: 'ACTIVE', alertTag: 'High student load', alertType: 'warning', students: 231, courses: 32 },
    { id: 's6', name: "St. Mary's Medical Center", location: 'San Diego, CA', status: 'ACTIVE', students: 30, courses: 9 },
    { id: 's7', name: 'Riverside Health Clinic', location: 'Seattle, WA', status: 'ACTIVE', alertTag: 'Low activity', alertType: 'info', students: 6, courses: 3 },
    { id: 's8', name: 'Lakewood Community Hospital', location: 'Austin, TX', status: 'ACTIVE', alertTag: 'High student load', alertType: 'warning', students: 12, courses: 5 },
    { id: 's9', name: 'Summit Care Center', location: 'Seattle, WA', status: 'ACTIVE', students: 12, courses: 9 },
    { id: 's10', name: 'Northside Medical', location: 'New York, NY', status: 'BALANCED', students: 15, courses: 4 },
    { id: 's11', name: 'Eastview Hospital', location: 'Austin, TX', status: 'ACTIVE', alertTag: 'High student load', alertType: 'warning', students: 5, courses: 12 },
    { id: 's12', name: 'Harbor Health', location: 'San Diego, CA', status: 'INACTIVE', students: 0, courses: 1 },
    { id: 's13', name: 'Pine Grove Medical', location: 'New York, NY', status: 'ACTIVE', students: 22, courses: 7 },
    { id: 's14', name: 'Valley Regional Hospital', location: 'Boston, MA', status: 'BALANCED', students: 10, courses: 3 },
  ],
  'org-2': [
    { id: 's1', name: 'Arlington Memorial Hospital', location: 'Arlington, TX', status: 'ACTIVE', alertTag: 'High student load', alertType: 'warning', students: 78, courses: 12 },
    { id: 's2', name: 'Tarrant County Medical', location: 'Fort Worth, TX', status: 'ACTIVE', students: 45, courses: 8 },
    { id: 's3', name: 'DFW Health System', location: 'Dallas, TX', status: 'BALANCED', students: 32, courses: 6 },
    { id: 's4', name: 'Texas Health Resources', location: 'Arlington, TX', status: 'ACTIVE', students: 56, courses: 10 },
    { id: 's5', name: 'Baylor Scott & White', location: 'Dallas, TX', status: 'INACTIVE', students: 0, courses: 3 },
    { id: 's6', name: 'Methodist Dallas', location: 'Dallas, TX', status: 'ACTIVE', alertTag: 'Low activity', alertType: 'info', students: 12, courses: 4 },
  ],
  'org-3': [
    { id: 's1', name: 'Boca Raton Regional', location: 'Boca Raton, FL', status: 'ACTIVE', students: 38, courses: 7 },
    { id: 's2', name: 'FAU Medical Center', location: 'Boca Raton, FL', status: 'ACTIVE', alertTag: 'High student load', alertType: 'warning', students: 65, courses: 11 },
    { id: 's3', name: 'Palm Beach Gardens Medical', location: 'Palm Beach, FL', status: 'BALANCED', students: 20, courses: 5 },
    { id: 's4', name: 'Jupiter Medical Center', location: 'Jupiter, FL', status: 'ACTIVE', students: 28, courses: 6 },
    { id: 's5', name: 'Delray Medical Center', location: 'Delray Beach, FL', status: 'INACTIVE', students: 0, courses: 2 },
  ],
};

@Injectable({ providedIn: 'root' })
export class ClinicalSitesService {
  private readonly orgService = inject(OrganizationService);

  readonly sites = computed<ClinicalSite[]>(() =>
    MOCK_SITES[this.orgService.currentOrgId()] ?? MOCK_SITES['org-1']
  );
}
