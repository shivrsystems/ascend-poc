export interface DashboardStats {
  totalStudents: number;
  totalSites: number;
  totalCourses: number;
  scheduledEvaluations: number;
  newStudentsThisMonth: number;
  newSitesThisMonth: number;
  newCoursesThisMonth: number;
  newEvaluationsThisMonth: number;
}

export interface Report {
  id: string;
  name: string;
  updatedBy: string;
  updatedDate: string;
  status: 'COMPLETED' | 'UNDER REVIEW';
  category: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
}

export interface Activity {
  id: string;
  text: string;
  count?: number;
  timestamp: string;
  color: 'green' | 'blue' | 'amber' | 'red';
}
