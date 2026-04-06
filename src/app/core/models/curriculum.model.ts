export interface Curriculum {
  id: string;
  name: string;
  createdDate: string;
  lastUpdated: string;
  studyOptions: number;
  status: 'PUBLISHED' | 'DRAFT';
}
