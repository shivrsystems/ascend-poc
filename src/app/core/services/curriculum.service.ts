import { Injectable, inject, computed } from '@angular/core';
import { OrganizationService } from './organization.service';
import { Curriculum } from '../models/curriculum.model';

const MOCK_CURRICULA: Record<string, Curriculum[]> = {
  'org-1': [
    { id: 'c1', name: 'Latest Curriculum — Spring 2026', createdDate: '03/20/2026', lastUpdated: '03/20/2026', studyOptions: 4, status: 'PUBLISHED' },
    { id: 'c2', name: 'AI Ethics Curriculum 20260415124500', createdDate: '05/10/2026', lastUpdated: '05/10/2026', studyOptions: 3, status: 'DRAFT' },
    { id: 'c3', name: 'Data Science Curriculum 20260517204500', createdDate: '06/15/2026', lastUpdated: '06/15/2026', studyOptions: 5, status: 'PUBLISHED' },
    { id: 'c4', name: 'Cybersecurity Curriculum 20260620140000', createdDate: '07/25/2026', lastUpdated: '07/25/2026', studyOptions: 6, status: 'DRAFT' },
    { id: 'c5', name: 'Machine Learning Curriculum 20260725110000', createdDate: '08/30/2026', lastUpdated: '08/30/2026', studyOptions: 2, status: 'PUBLISHED' },
    { id: 'c6', name: 'Blockchain Curriculum 20260830123000', createdDate: '09/12/2026', lastUpdated: '09/12/2026', studyOptions: 3, status: 'DRAFT' },
    { id: 'c7', name: 'Cloud Computing Curriculum 20260918093000', createdDate: '10/05/2026', lastUpdated: '10/05/2026', studyOptions: 4, status: 'PUBLISHED' },
    { id: 'c8', name: 'Digital Marketing Curriculum 20261005104500', createdDate: '11/02/2026', lastUpdated: '11/02/2026', studyOptions: 5, status: 'PUBLISHED' },
    { id: 'c9', name: 'Software Development Curriculum 20261115121500', createdDate: '12/01/2026', lastUpdated: '12/01/2026', studyOptions: 7, status: 'DRAFT' },
    { id: 'c10', name: 'User Experience Design Curriculum 20261220203000', createdDate: '01/15/2027', lastUpdated: '01/15/2027', studyOptions: 3, status: 'PUBLISHED' },
  ],
  'org-2': [
    { id: 'c1', name: 'Nursing Fundamentals — Fall 2026', createdDate: '08/15/2026', lastUpdated: '08/20/2026', studyOptions: 6, status: 'PUBLISHED' },
    { id: 'c2', name: 'Advanced Pharmacology 2026', createdDate: '09/01/2026', lastUpdated: '09/15/2026', studyOptions: 4, status: 'PUBLISHED' },
    { id: 'c3', name: 'Clinical Leadership Program', createdDate: '10/10/2026', lastUpdated: '10/10/2026', studyOptions: 3, status: 'DRAFT' },
    { id: 'c4', name: 'Pediatric Nursing Essentials', createdDate: '11/05/2026', lastUpdated: '11/05/2026', studyOptions: 5, status: 'PUBLISHED' },
    { id: 'c5', name: 'Emergency Care Protocols', createdDate: '12/01/2026', lastUpdated: '12/01/2026', studyOptions: 2, status: 'DRAFT' },
  ],
  'org-3': [
    { id: 'c1', name: 'Tropical Medicine Curriculum', createdDate: '07/01/2026', lastUpdated: '07/15/2026', studyOptions: 4, status: 'PUBLISHED' },
    { id: 'c2', name: 'Marine Biology Health Sciences', createdDate: '08/20/2026', lastUpdated: '09/01/2026', studyOptions: 3, status: 'PUBLISHED' },
    { id: 'c3', name: 'Coastal Emergency Response', createdDate: '09/15/2026', lastUpdated: '09/15/2026', studyOptions: 5, status: 'DRAFT' },
    { id: 'c4', name: 'Public Health Analytics', createdDate: '10/20/2026', lastUpdated: '10/20/2026', studyOptions: 2, status: 'PUBLISHED' },
  ],
};

@Injectable({ providedIn: 'root' })
export class CurriculumService {
  private readonly orgService = inject(OrganizationService);

  readonly curricula = computed<Curriculum[]>(() =>
    MOCK_CURRICULA[this.orgService.currentOrgId()] ?? MOCK_CURRICULA['org-1']
  );
}
