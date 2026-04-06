export interface ClinicalSite {
  id: string;
  name: string;
  location: string;
  status: 'ACTIVE' | 'INACTIVE' | 'BALANCED';
  alertTag?: string;
  alertType?: 'warning' | 'info';
  students: number;
  courses: number;
  units?: string[];
}
